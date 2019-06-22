import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CacheService } from '@core/helpers';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(
    private cacheService: CacheService
  ) { }
  // TODO setup the cache behavior
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req);
  }
}
