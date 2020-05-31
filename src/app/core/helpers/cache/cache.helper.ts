import { HttpResponse } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { AsyncCollection, AsyncDatabase } from '@ezzabuzaid/document-storage';
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

    constructor(
        @Inject(CacheDatabase) private readonly storage: AsyncDatabase
    ) { }


    public populate(name: string) {
        this.collection = this.storage.collection<HttpCacheEntry>(name);
    }

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
