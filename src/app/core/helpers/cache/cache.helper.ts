import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AsyncDatabase, AsyncCollection } from '@ezzabuzaid/document-storage';
import { AppUtils } from '../utils';
export const CacheDatabase = new InjectionToken<AsyncDatabase>('CacheDatabase');

export class HttpCacheEntry {
    private _value: any;
    public lastUpdate = Date.now();

    constructor(
        public url: string,
        value: HttpResponse<any>
    ) {
        this.value = value;
    }

    set value(response) {
        this._value = JSON.stringify(response) as any;
    }

    get value() {
        return JSON.parse(this._value as any);
    }

}

@Injectable({
    providedIn: 'root'
})
export class HttpCacheHelper {
    private collection: AsyncCollection<HttpCacheEntry> = null;


    public populate(name: string) {
        this.collection = this.storage.collection<HttpCacheEntry>(name);
    }

    constructor(
        @Inject(CacheDatabase) private storage: AsyncDatabase
    ) { }

    removeOutdatedEntries() {
        this.collection.getAll()
            .then(entries => {
                const maxAge = AppUtils.daysToSeconds(1);
                entries.forEach(({ lastUpdate, id }) => {
                    if (AppUtils.isDateElapsed(lastUpdate, maxAge)) {
                        this.collection.delete(id);
                    }
                });
            });
    }

    public get(url: string) {
        return this.collection
            .get((entry) => entry.url === url)
            .then(response => response && new HttpResponse(response.value));
    }

    public set(uri: string, value: HttpResponse<any>) {
        return this.collection.set(new HttpCacheEntry(uri, value));
    }

    public clear() {
        return this.collection.clear();
    }
}
