import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CustomHeaders } from '../http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { UserService } from '@shared/user';
import { TokenService } from '@core/helpers/token';
import { Constants } from '@core/constants';

@Injectable()
export class TeardownInterceptor implements HttpInterceptor {
    constructor(
        private userService: UserService,
        private snackbar: MatSnackBar,
        private tokenService: TokenService,
        @Inject(PLATFORM_ID) private platformId: any,
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
                // TODO: implement retry
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
                                this.userService.logout();
                                break;
                            case 500:
                                this.snackbar.open('Internal error. Please try again later.');
                                break;
                            default:
                                break;
                        }
                    }
                    return throwError(event);
                })
            );
    }

    private removeHeaders(requestHeaders: HttpHeaders, ...customHeaders: (keyof HttpHeaders)[]) {
        customHeaders.forEach(one => {
            if (requestHeaders.has(one)) {
                requestHeaders = requestHeaders.delete(one);
            }
        });
        return requestHeaders;
    }

}
