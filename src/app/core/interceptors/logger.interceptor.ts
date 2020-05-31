import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Logger } from '@core/helpers/logger';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const log = new Logger('LoggerInterceptor');
@Injectable()
export class LoggerInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    return next.handle(request)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            const elapsed = Date.now() - started;
            log.info(`${ request.method } Request for ${ request.urlWithParams } took ${ elapsed } ms. and the body is`, request.body);
          }
        })
      );
  }
}
