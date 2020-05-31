import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { IRequestOptions } from '@shared/common';

import { RequestOptions } from '@ezzabuzaid/ngx-request-options';
@Injectable()
export class UrlInterceptor implements HttpInterceptor {

  constructor(private requestOptions: RequestOptions<IRequestOptions>) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url = request.url;
    if (this.requestOptions.get(request, 'DEFAULT_URL')) {
      url = environment.endpointUrl + request.url;
    }
    return next.handle(this.requestOptions.clone(request, { url }));
  }

}
