import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHandler, HTTP_INTERCEPTORS, HttpInterceptor, HttpParams, HttpHeaders } from '@angular/common/http';
import { RequestInterceptor } from './interceptors';
import { MutateRequest } from './helpers';

@Injectable()
export class HttpService extends HttpClient {
  private http = new HttpClient(this.httpHandler);
  constructor(
    private httpHandler: HttpHandler,
    @Inject(HTTP_INTERCEPTORS) private interceptors: HttpInterceptor[]
  ) {
    super(httpHandler);
  }

  // request(method?: any, url?: any, options?: any): any {
  //   options.config = { test: false };
  //   return this.http.request(method, url, options);
  // }

  configure(obj: MutateRequest) {
    this.getRequestInterceptor().configure(obj);
    return this;
  }

  private getRequestInterceptor() {
    return this.getInterceptor(RequestInterceptor) as RequestInterceptor;
  }

  private getInterceptor(InterceptorConstructor) {
    return this.interceptors.find((interceptor) => {
      return interceptor['name'] === InterceptorConstructor.name;
    });
  }

}


// HttpClient is declared in a re-exported module, so we have to extend the original module to make it work properly
// (see https://github.com/Microsoft/TypeScript/issues/13897)
declare module '@angular/common/http/http' {

  // Augment HttpClient with the added configuration methods from HttpService, to allow in-place replacement of
  // HttpClient with HttpService using dependency injection
  export interface HttpClient {
    /**
     * Configure request object.
     * @return The new instance.
     */
    configure(obj: MutateRequest): HttpClient;

  }

}
