import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { LocalStorage } from '../localstorage';

interface Cache {
    lastUpdate: number;
    url: string;
    response: Request;
}

@Injectable({
    providedIn: 'root'
})
export class CacheService {
    maxAge = this.daysToSeconds();
    cache = null;

    daysToSeconds(days = 2) {
        const d = new Date();
        const a = new Date();
        a.setDate(a.getDate() + days);
        return a.getTime() - d.getTime();
    }

    isExpired(lastUpdate, maxAge = this.maxAge) {
        const expired = Date.now() - maxAge;
        return lastUpdate < expired;
    }

    constructor(
        private localStorage: LocalStorage
    ) {
        // this.localStorage.getItem(CacheService.name)
        //     .pipe(map(data => {
        //         return ((data && new Map<string, Cache>(data as any)) || new Map) as Map<string, Cache>;
        //     }))
        //     .subscribe(data => {
        //         data.forEach(({ lastUpdate, url }) => {
        //             if (this.isExpired(lastUpdate)) {
        //                 this.cache.delete(url);
        //             }
        //         });
        //     });
    }

    get(req: HttpRequest<any>): HttpResponse<any> | undefined {
        const url = req.urlWithParams;
        const cached = this.cache.get(url);

        if (!cached) {
            return undefined;
        }

        return cached.response;
    }

    put(req: HttpRequest<any>, response: HttpResponse<any>): void {
        const url = req.urlWithParams;
        const entry = { url, response, lastRead: Date.now() };
        this.cache.set(url, entry);

    }
}
