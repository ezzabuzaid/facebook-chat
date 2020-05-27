import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHandler, HTTP_INTERCEPTORS, HttpInterceptor } from '@angular/common/http';
import { SetupInterceptor } from '../interceptors/setup.interceptor';
import { ModifiableInterceptor, RequestOptions } from './http.model';

@Injectable({
    providedIn: 'root',
})
export class HttpService extends HttpClient {

    constructor(
        httpHandler: HttpHandler,
        private injcetor: Injector
    ) {
        super(httpHandler);
    }

    get interceptors(): (HttpInterceptor & ModifiableInterceptor)[] {
        return this.injcetor.get(HTTP_INTERCEPTORS) as any;
    }

    configure(obj: Partial<RequestOptions>) {
        this.setupInterceptor.configure(obj);
        return this;
    }

    get setupInterceptor() {
        return this.interceptors.find(({ name }) => name === SetupInterceptor.name) as SetupInterceptor;
    }


}
