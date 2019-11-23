import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../helpers/token';
import { CustomHttpHeaders } from '../http/http.model';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
    constructor(
        private tokenService: TokenService,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers = this.removeHeaders(req.headers, ...Object.values(CustomHttpHeaders));
        headers = headers
            .set('cccept', 'application/json')
            .set('content-type', 'application/json');

        if (this.tokenService.isLogged && !this.tokenService.isExpired) {
            headers = headers.set('Authorization', `Bearer ${this.tokenService.token}`);
        }

        return next.handle(req.clone({ headers }));
    }

    removeHeaders(requestHeaders: HttpHeaders, ...headers) {
        headers.forEach(one => {
            if (requestHeaders.has(one)) {
                requestHeaders = requestHeaders.delete(one);
            }
        });
        return requestHeaders;
    }

}
