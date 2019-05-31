import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from '@core/utils';
const log = new Logger('INTERCEPTOR LOGGER');

@Injectable({
  providedIn: 'root'
})
export class LoggerInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          const elapsed = Date.now() - started;
          log.warn(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
        }
      })
    );
  }
}
