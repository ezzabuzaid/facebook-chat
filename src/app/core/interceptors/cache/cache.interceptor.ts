import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { HttpCacheHelper } from '@core/helpers/cache';
import { Logger } from '@core/helpers/logger';
import { AppUtils } from '@core/helpers/utils';
import { RequestOptions } from '@ezzabuzaid/ngx-request-options';
import { IRequestOptions } from '@shared/common';
const log = new Logger('CacheInterceptor');
@Injectable()
export class CacheInterceptor implements HttpInterceptor {

    constructor(
        private cacheHelper: HttpCacheHelper,
        private requestOptions: RequestOptions<IRequestOptions>
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const cacheable = this.requestOptions.get(req, 'LOCAL_CACHE');
        if (AppUtils.not(cacheable)) {
            return next.handle(req);
        }

        this.cacheHelper.populate(this.requestOptions.get(req, 'CACHE_CATEGORY'));

        return this.cacheHelper.get(req.urlWithParams)
            .pipe(switchMap(response => {
                if (AppUtils.isNullorUndefined(response)) {
                    return next.handle(req)
                        .pipe(map((event) => {
                            if (event instanceof HttpResponse) {
                                this.cacheHelper.set(req.urlWithParams, event.clone());
                            }
                            return event;
                        }));
                } else {
                    log.debug(`${ req.method } Request for ${ req.urlWithParams } fetched from cache`);
                    return of(response);
                }
            }));
    }
}
