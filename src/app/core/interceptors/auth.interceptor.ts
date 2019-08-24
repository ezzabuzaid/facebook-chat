import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  // TODO setup your own custom role or use nebular security module

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
