
import { HttpResponse } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { AsyncCollection, AsyncDatabase } from '@ezzabuzaid/document-storage';
import { from } from 'rxjs';
import { AppUtils } from '../utils';
export const CACHE_DATABASE = new InjectionToken<AsyncDatabase>('CacheDatabase');

export class HttpCacheEntry {
    constructor(
        public url: string,
        public value: HttpResponse<any>
    ) { }
}

@Injectable({
    providedIn: 'root'
})
export class HttpCacheHelper {
    private collection: AsyncCollection<HttpCacheEntry> = null;

    constructor(
        @Inject(CACHE_DATABASE) private storage: AsyncDatabase
    ) { }

    // TODO: setup cache invalidate strategy
    removeOutdatedEntries() {
        this.collection.getAll()
            .then(entries => {
                const maxAge = AppUtils.daysToSeconds(1);
                entries.forEach(({ id }) => {
                    if (AppUtils.isDateElapsed(Date.now(), maxAge)) {
                        this.collection.delete(id);
                    }
                });
            });
    }

    public populate(name: string) {
        this.collection = this.storage.collection<HttpCacheEntry>(name);
    }

    public set(uri: string, value: HttpResponse<any>) {
        return this.collection.set(new HttpCacheEntry(uri, value));
    }

    public get(url: string) {
        const result = this.collection
            .get((entry) => entry.url === url)
            .then(response => response && new HttpResponse(response.value));
        return from(result);
    }

    public clear() {
        return this.collection.clear();
    }

}
