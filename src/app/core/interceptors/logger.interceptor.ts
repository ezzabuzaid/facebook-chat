import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from '@core/helpers/logger';
const log = new Logger('LoggerInterceptor');
@Injectable()
export class LoggerInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    return next.handle(req)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            const elapsed = Date.now() - started;
            log.info(`${req.method} Request for ${req.urlWithParams} took ${elapsed} ms. and the body is`, req.body);
          }
        })
      );
  }
}
