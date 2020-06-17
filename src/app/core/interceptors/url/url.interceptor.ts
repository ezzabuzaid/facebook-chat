import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { RequestOptions } from '@ezzabuzaid/ngx-request-options';
import { IRequestOptions } from '@shared/common';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {

    constructor(
        private requestOptions: RequestOptions<IRequestOptions>
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let url = req.url;
        if (this.requestOptions.get(req, 'DEFAULT_URL')) {
            url = environment.endpointUrl + req.url;
        }
        return next.handle(this.requestOptions.clone(req, { url }));
    }

}
