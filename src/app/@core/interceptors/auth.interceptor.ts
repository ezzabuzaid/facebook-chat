import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApplicationHelpers } from '@core/helpers';
import { TokenService } from '@core/helpers';

import { Logger } from '@core/utils';
import { UserService } from '@shared/user';
const log = new Logger('INTERCEPTOR AUTH');

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private userService: UserService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone())
      .pipe(
        tap(
          (response: HttpResponse<any>) => {
            if (response instanceof HttpResponse) {
              const status = +response.status;
              if (status === 404) {

              }
            }
          }, (error) => {
            if (error instanceof HttpErrorResponse) {
              if (error.status === 401) {
                if (this.tokenService.isLogged) {
                  this.userService.logout()
                    .subscribe(() => {
                      this.router.navigate([ApplicationHelpers.LOGIN_PATH]);
                      // .then(() => location.reload())
                      // .catch(() => location.reload());
                    }, () => location.reload());
                }
              } else if (error.status === 500) {
                this.router.navigate(['/error']);
              } else if (error.status === 404) {
                // this.router.navigate(['/not-found']);
              } else if (error.status === 403) {
                // this.router.navigate(['/not-allowed']);
              }
            }
          })
      );
  }

}
