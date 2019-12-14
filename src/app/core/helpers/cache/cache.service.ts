import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AsyncDatabase, AsyncCollection, IndexedDB } from '@ezzabuzaid/document-storage';
import { AppUtils } from '../utils';

interface ICacheEntry {
    lastUpdate: number;
    url: string;
    response: HttpResponse<any>;
}

@Injectable({
    providedIn: 'root'
})
export class CacheService {
    private storage = new AsyncDatabase(new IndexedDB('cache'));
    public collection: AsyncCollection<ICacheEntry> = null;


    public populate(name: string) {
        this.collection = this.storage.collection<ICacheEntry & any>(name);
    }

    constructor() {
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

    public async get(url: string) {
        const entity = await this.collection.get((object) => object.url === url);
        if (entity) {
            entity.response = JSON.parse(entity.response as any);
            return entity;
        }
        throw new Error();
    }

    public set(url: string, response: HttpResponse<any>) {
        return this.collection.set({
            url,
            response: JSON.stringify(response) as any,
            lastUpdate: Date.now()
        });
    }
}
