import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCacheHelper } from '@core/helpers/cache';
import { Logger } from '@core/helpers/logger';
import { AppUtils } from '@core/helpers/utils';
import { IRequestOptions } from '@shared/common';
import { RequestOptions } from '@ezzabuzaid/ngx-request-options';
import { from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
const log = new Logger('CacheInterceptor');
@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    constructor(
        private cacheHelper: HttpCacheHelper,
        private requestOptions: RequestOptions<IRequestOptions>
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isCacheable = this.requestOptions.get(request, 'LOCAL_CACHE');
        console.log(AppUtils.notEquals(request.method, 'GET'));
        console.log(request.method !== 'GET')
        console.log(AppUtils.isFalsy(isCacheable));
        if (AppUtils.notEquals(request.method, 'GET') || AppUtils.isFalsy(isCacheable)) {
            return next.handle(request.clone());
        }
        this.cacheHelper.populate(this.requestOptions.get(request, 'CACHE_CATEGORY'));

        return from(this.cacheHelper.get(request.urlWithParams))
            .pipe(
                switchMap(response => {
                    if (AppUtils.isNullorUndefined(response)) {
                        return next.handle(request.clone())
                            .pipe(map((event: HttpResponse<any>) => {
                                if (event instanceof HttpResponse) {
                                    this.cacheHelper.set(request.urlWithParams, event.clone());
                                }
                                return event;
                            }));
                    } else {
                        log.debug(`${ request.method } Request for ${ request.urlWithParams } fetched from cache`);
                        return of(response);
                    }
                })
            );
    }
}
