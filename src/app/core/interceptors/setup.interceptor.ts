import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomHttpHeaders, ISetupInterceptor, ModifiableInterceptor, MutateRequest } from '../http/http.model';

@Injectable()
export class SetupInterceptor implements ISetupInterceptor, ModifiableInterceptor {
    name = SetupInterceptor.name;
    constructor() {
        this.defaultState();
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = this.setCustomHeaders(req.headers);
        this.defaultState();

        return next.handle(req.clone({ headers }))
            .pipe(
                map(
                    (response: HttpResponse<any>) => {
                        if (response instanceof HttpResponse && !JSON.parse(req.headers.get(CustomHttpHeaders.RETURN_FULL_BODY))) {
                            return response.clone({ body: response.body.data });
                        }
                        return response;
                    })
            );
    }

    configure(obj: MutateRequest) {
        Object.assign(this, obj);
    }

    defaultState() {
        // tslint:disable-next-line: forin
        for (const header in CustomHttpHeaders) {
            this[CustomHttpHeaders[header]] = false;
        }
    }

    setCustomHeaders(orignalHeaders) {
        // tslint:disable-next-line: forin
        for (const header in CustomHttpHeaders) {
            orignalHeaders = orignalHeaders.set(CustomHttpHeaders[header], String(this[CustomHttpHeaders[header]]));
        }
        return orignalHeaders;
    }
}
