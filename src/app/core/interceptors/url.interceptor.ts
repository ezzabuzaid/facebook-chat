import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { CustomHttpHeaders } from '../http/http.model';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url = environment.endpointUrl + req.url;
    if (JSON.parse(req.headers.get(CustomHttpHeaders.DISABLE_DEFAULT_URL))) {
      url = req.url;
    }
    return next.handle(req.clone({ url }));
  }

}
