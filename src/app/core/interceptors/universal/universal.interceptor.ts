import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';

const isAbsoluteURL = new RegExp('^(?:[a-z]+:)?//', 'i');

@Injectable()
export class UniversalInterceptor implements HttpInterceptor {
    constructor(@Optional() @Inject(REQUEST) protected request: Request) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (this.request && isAbsoluteURL.test(req.url)) {
            const protocolHost = `${this.request.protocol}://${this.request.host}`;
            const pathSeparator = req.url.startsWith('/') ? '' : '/';
            const url = protocolHost + pathSeparator + req.url;
            return next.handle(req.clone({ url }));
        }
        return next.handle(req);
    }
}