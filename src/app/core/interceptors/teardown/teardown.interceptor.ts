import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Constants } from '@core/constants';
import { SubjectFactory } from '@core/helpers/subject-factory';
import { TokenHelper } from '@core/helpers/token';
import { AppUtils, tryOrComplete } from '@core/helpers/utils';
import { RequestOptions } from '@ezzabuzaid/ngx-request-options';
import { ApplicationUser } from '@core/application-user';
import { IRequestOptions } from '@shared/common';
import { Observable, throwError, from } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

@Injectable()
export class TeardownInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private readonly requestQueue = new SubjectFactory(false);

    constructor(
        private readonly applicationUser: ApplicationUser,
        private readonly snackbar: MatSnackBar,
        private readonly tokenHelper: TokenHelper,
        private readonly requestOptions: RequestOptions<IRequestOptions>
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers = request.headers.set('Authorization', `${ this.tokenHelper.token }`);


        return from(this.applicationUser.getDeviceUUID())
            .pipe(switchMap((uuid) => {
                headers = headers.set(Constants.Application.DEVICE_UUID, `${ uuid }`);
                return next.handle(this.requestOptions.clone(request, { headers }))
                    .pipe(
                        catchError((event: HttpErrorResponse) => {
                            if (event instanceof HttpErrorResponse) {
                                switch (event.status) {
                                    case 401:
                                        return this.tryRefreshToken(event).pipe(switchMap(() => this.intercept(request, next)));
                                    case 500:
                                        this.snackbar.open('Internal error. Please try again later.');
                                        break;
                                }
                            }
                            return throwError(event);
                        })
                    );
            }))

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
            return this.applicationUser.refreshToken()
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
            this.applicationUser.logout();
            return throwError(event);
        }));
    }

}
