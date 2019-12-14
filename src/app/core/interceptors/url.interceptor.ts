import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { getHeader, ECustomHeaders } from '../http/http.model';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url = environment.endpointUrl + req.url;
    if (!getHeader(req.headers, ECustomHeaders.DEFAULT_URL)) {
      url = req.url;
    }
    return next.handle(req.clone({ url }));
  }

}
