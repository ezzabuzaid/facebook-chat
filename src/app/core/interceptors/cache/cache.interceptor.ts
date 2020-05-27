import { Injectable, } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { HttpMethod, RequestData } from '../../http';
import { Logger } from '@core/helpers/logger';
import { AppUtils } from '@core/helpers/utils';
import { HttpCacheHelper } from '@core/helpers/cache';
const log = new Logger('CacheInterceptor');
@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    constructor(
        private cacheHelper: HttpCacheHelper,
        private requestData: RequestData
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isCacheable = this.requestData.get(request, 'LOCAL_CACHE');
        console.log(AppUtils.notEquals(request.method, HttpMethod.GET));
        console.log(request.method !== HttpMethod.GET)
        console.log(AppUtils.isFalsy(isCacheable));
        if (AppUtils.notEquals(request.method, HttpMethod.GET) || AppUtils.isFalsy(isCacheable)) {
            return next.handle(request.clone());
        }
        this.cacheHelper.populate(this.requestData.get<string>(request, 'CACHE_CATEGORY'));

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
