import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LanguageService, TokenService, CustomHttpHeaders } from '@core/helpers';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private languageService: LanguageService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = this.removeHeaders(req.headers, ...Object.keys(CustomHttpHeaders));
    headers = headers.set('Accept-Language', this.languageService.language);
    if (this.tokenService.isLogged) {
      // headers = headers.set('Authorization', `Bearer ${this.tokenService.getToken}`);
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
