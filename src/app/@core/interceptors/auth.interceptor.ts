import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApplicationConstants } from '@core/helpers';
import { TokenService } from '@core/helpers';

import { Logger } from '@core/utils';
import { UserService } from '@shared/user';
const log = new Logger('INTERCEPTOR AUTH');

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone())
      .pipe(
        tap(
          (response: HttpResponse<any>) => {
            if (response instanceof HttpResponse) {
              const status = +response.status;
            }
          })
      );
  }

}
