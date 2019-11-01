import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHandler, HTTP_INTERCEPTORS, HttpInterceptor } from '@angular/common/http';
import { SetupInterceptor } from '../interceptors';
import { MutateRequest, ModifiableInterceptor } from './http.model';

@Injectable()
export class HttpService extends HttpClient {
  constructor(
    httpHandler: HttpHandler,
    @Inject(HTTP_INTERCEPTORS) private interceptors: (HttpInterceptor & ModifiableInterceptor)[]
  ) {
    super(httpHandler);
  }

  configure(obj: MutateRequest) {
    this.getRequestInterceptor().configure(obj);
    return this;
  }

  private getRequestInterceptor() {
    return this.getInterceptor(SetupInterceptor) as SetupInterceptor;
  }

  private getInterceptor(InterceptorConstructor: ModifiableInterceptor) {
    return this.interceptors.find(({ name }) => name === InterceptorConstructor.name);
  }

}
