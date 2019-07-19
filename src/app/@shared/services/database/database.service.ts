import { Injectable } from '@angular/core';
import { LocalStorage } from '../localstorage';
import { DatabaseProvider } from './database-provider';


@Injectable({ providedIn: 'root' })
export class DatabaseService {
    // TODO Adapter class to convert existing database interface to meet the generic database provider
    // REVIEW private provider = new DatabaseProvider(new DatabaseAdabter(new LocalStorage));

    private provider = new DatabaseProvider(new LocalStorage());

    constructor(
    ) { }

    collection<T>(name: string) {
        return this.provider.get<T>(name) || this.provider.create<T>(name);
    }

    create(name) {
        // TODO create database
    }

}
