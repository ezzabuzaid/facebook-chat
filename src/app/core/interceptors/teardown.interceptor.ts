import { Injectable, } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CustomHeaders } from '../http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, switchMap, tap, filter, take } from 'rxjs/operators';
import { UserService } from '@shared/user';
import { TokenService } from '@core/helpers/token';
import { Constants } from '@core/constants';
import { AppUtils, tryOrComplete } from '@core/helpers/utils';
import { Listener } from '@core/helpers/listener';

@Injectable()
export class TeardownInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private requestQueue = new Listener(false);

    constructor(
        private userService: UserService,
        private snackbar: MatSnackBar,
        private tokenService: TokenService,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers = this.removeHeaders(req.headers, ...Object.keys(new CustomHeaders()) as any);
        if (this.userService.isAuthenticated) {
            headers = headers.set('Authorization', `${this.tokenService.token}`);
        }
        headers = headers.set(Constants.Application.DEVICE_UUID, `${this.userService.getDeviceUUID()}`);

        // const retryCount = 0;
        return next.handle(req.clone({ headers }))
            .pipe(
                // TODO: implement retry with backoff operator
                // retryWhen((source) => {
                //     return source.pipe(
                //         delay(3000),
                //         mergeMap((error)=> retryCount > 3 ? throwError(error) : of(error) )
                //     );
                // }),
                catchError((event: HttpErrorResponse) => {
                    if (event instanceof HttpErrorResponse) {
                        switch (event.status) {
                            case 401:
                                return this.tryRefreshToken(event)
                                    .pipe(switchMap(() => this.intercept(req, next)));
                            case 500:
                                this.snackbar.open('Internal error. Please try again later.');
                        }
                    }
                    return throwError(event);
                })
            );
    }

    refreshToken() {
        if (this.isRefreshing) {
            return this.requestQueue.listen()
                .pipe(
                    filter(AppUtils.isTruthy),
                    take(1)
                );
        } else {
            this.isRefreshing = true;
            this.requestQueue.notify(false);
            return this.userService.refreshToken()
                .pipe(
                    tap((token: any) => {
                        this.isRefreshing = false;
                        this.requestQueue.notify(true);
                    })
                );
        }
    }

    tryRefreshToken(event: HttpErrorResponse) {
        console.log(event);
        const blackList = [
            Constants.API.PORTAL.login,
            Constants.API.PORTAL.refreshtoken,
            Constants.API.PORTAL.logout,
        ];
        return tryOrComplete<HttpErrorResponse>(
            () => AppUtils.isFalsy(blackList.some(url => event.url.includes(url))),
            () => this.refreshToken(),
            event
        ).pipe(catchError(() => {
            this.isRefreshing = false;
            this.userService.logout();
            return throwError(event);
        }));
    }

    removeHeaders(requestHeaders: HttpHeaders, ...customHeaders: (keyof HttpHeaders)[]) {
        customHeaders.forEach(one => {
            if (requestHeaders.has(one)) {
                requestHeaders = requestHeaders.delete(one);
            }
        });
        return requestHeaders;
    }

}
