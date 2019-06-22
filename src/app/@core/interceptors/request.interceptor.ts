import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomHttpHeaders,MutateRequest } from '@core/helpers/constants';


interface HttpRequestInterceptor extends HttpInterceptor {
  configure: (obj: MutateRequest) => void;
}

@Injectable()
export class RequestInterceptor implements HttpRequestInterceptor {
  name = RequestInterceptor.name;
  constructor() {
    this.defaultState();
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // TODO iterate over them
    const headers = req.headers
      .set(CustomHttpHeaders.DISABLE_DEFAULT_URL, String(this[CustomHttpHeaders.DISABLE_DEFAULT_URL]))
      .set(CustomHttpHeaders.DISABLE_SNACKBAR, String(this[CustomHttpHeaders.DISABLE_SNACKBAR]))
      .set(CustomHttpHeaders.USE_LOCAL_CACHE, String(this[CustomHttpHeaders.USE_LOCAL_CACHE]))
      .set(CustomHttpHeaders.ENABLE_FORM_UI, String(this[CustomHttpHeaders.ENABLE_FORM_UI]));
    this.defaultState();
    return next.handle(req.clone({ headers }));
  }

  configure(obj: MutateRequest) {
    Object.assign(this, obj);
  }

  private defaultState() {
    // tslint:disable-next-line: forin
    for (const header in CustomHttpHeaders) {
      this[CustomHttpHeaders[header]] = false;
    }
  }

}
