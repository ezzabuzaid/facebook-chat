import { Injectable, } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { HttpMethod, getHeader, ECustomHeaders } from '../http';
import { Logger } from '@core/helpers/logger';
import { AppUtils } from '@core/helpers/utils';
import { HttpCacheHelper } from '@core/helpers/cache';
const log = new Logger('CacheInterceptor');
@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    constructor(
        private cacheService: HttpCacheHelper
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isCacheable = getHeader(req.headers, ECustomHeaders.LOCAL_CACHE);
        if (req.method !== HttpMethod.GET && !isCacheable) {
            return next.handle(req.clone());
        } else {
            this.cacheService.populate(getHeader<string>(req.headers, ECustomHeaders.CACHE_CATEGORY));
        }

        return from(this.cacheService.get(req.urlWithParams))
            .pipe(
                switchMap(response => {
                    if (AppUtils.isNullorUndefined(response)) {
                        return next.handle(req.clone())
                            .pipe(map((event: HttpResponse<any>) => {
                                if (event instanceof HttpResponse) {
                                    this.cacheService.set(req.urlWithParams, event.clone());
                                }
                                return event;
                            }));
                    } else {
                        log.debug(`${req.method} Request for ${req.urlWithParams} fetched from cache`);
                        return of(response);
                    }
                })
            );
    }
}
