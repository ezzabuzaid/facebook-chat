import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { RequestData } from '../http/http.model';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {

  constructor(
    private requestData: RequestData
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url = request.url;
    if (this.requestData.get(request, 'DEFAULT_URL')) {
      url = environment.endpointUrl + request.url;
    }
    return next.handle(this.requestData.reset(request, request.clone({ url })));
  }

}
