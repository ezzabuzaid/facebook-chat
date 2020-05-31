import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Constants } from '@core/constants';
import { SubjectFactory } from '@core/helpers/subject-factory';
import { TokenHelper } from '@core/helpers/token';
import { AppUtils, tryOrComplete } from '@core/helpers/utils';
import { RequestOptions } from '@ezzabuzaid/ngx-request-options';
import { UserService } from '@shared/account';
import { IRequestOptions } from '@shared/common';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

@Injectable()
export class TeardownInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private readonly requestQueue = new SubjectFactory(false);

    constructor(
        private readonly userService: UserService,
        private readonly snackbar: MatSnackBar,
        private readonly tokenService: TokenHelper,
        private readonly requestData: RequestOptions<IRequestOptions>
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers = request.headers.set(Constants.Application.DEVICE_UUID, `${ this.userService.getDeviceUUID() }`);
        if (this.userService.isAuthenticated) {
            headers = headers.set('Authorization', `${ this.tokenService.token }`);
        }


        // const retryCount = 0;
        return next.handle(this.requestData.reset(request, request.clone({ headers })))
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
                                return this.tryRefreshToken(event).pipe(switchMap(() => this.intercept(request, next)));
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
                    tap(() => {
                        this.isRefreshing = false;
                        this.requestQueue.notify(true);
                    })
                );
        }
    }

    tryRefreshToken(event: HttpErrorResponse) {
        const blackList = Object.values(Constants.API.PORTAL);
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

}
