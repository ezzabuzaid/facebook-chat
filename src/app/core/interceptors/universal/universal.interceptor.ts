import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { AppUtils } from '@core/helpers/utils';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';

const isAbsoluteURL = new RegExp('^(?:[a-z]+:)?//', 'i');

@Injectable()
export class UniversalInterceptor implements HttpInterceptor {
    constructor(@Optional() @Inject(REQUEST) protected serverRequest: Request) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        if (AppUtils.isTruthy(this.serverRequest) && AppUtils.isFalsy(isAbsoluteURL.test(request.url))) {
            const protocolHost = `${ this.serverRequest.protocol }://${ this.serverRequest.hostname }`;
            const pathSeparator = request.url.startsWith('/') ? '' : '/';
            const url = protocolHost + pathSeparator + request.url;
            return next.handle(request.clone({ url }));
        }
        return next.handle(request);
    }
}