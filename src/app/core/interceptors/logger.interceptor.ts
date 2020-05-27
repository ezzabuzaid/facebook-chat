import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from '@core/helpers/logger';
import { RequestData } from '@core/http/http.model';
const log = new Logger('LoggerInterceptor');
@Injectable()
export class LoggerInterceptor implements HttpInterceptor {


  constructor(
    private requestData: RequestData
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    return next.handle(request)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            console.log(request.urlWithParams, this.requestData.get(request, 'DEFAULT_URL'))
            const elapsed = Date.now() - started;
            log.info(`${ request.method } Request for ${ request.urlWithParams } took ${ elapsed } ms. and the body is`, request.body);
          }
        })
      );
  }
}
