import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { HttpMethod, getHeader, ECustomHeaders } from '../http';
import { Logger } from '@core/helpers/logger';
import { CacheService } from '@core/helpers/cache/cache.service';
const log = new Logger('CacheInterceptor');
@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    constructor(
        private cacheService: CacheService
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.cacheService.populate(getHeader<string>(req.headers, ECustomHeaders.CACHE_CATEGORY));
        const isCacheable = getHeader(req.headers, ECustomHeaders.LOCAL_CACHE);
        if (req.method === HttpMethod.GET || !isCacheable) {
            return next.handle(req.clone());
        }
        const cachedValue = this.cacheService.get(req.urlWithParams);
        return from(cachedValue)
            .pipe(
                map(entry => {
                    log.debug(`${req.method} Request for ${req.urlWithParams} fetched from cache`);
                    return new HttpResponse(entry.response);
                }),
                catchError((error) => {
                    return next.handle(req.clone())
                        .pipe(
                            tap((event: HttpResponse<any>) => {
                                if (event instanceof HttpResponse) {
                                    this.cacheService.set(req.urlWithParams, event.clone());
                                }
                            })
                        );
                }),
            );
    }
}
