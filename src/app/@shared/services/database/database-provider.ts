
import { Collection } from './database-collection';
import { Storage } from '.';

export class DatabaseProvider {
    private collections: Collection<any>[] = [];

    constructor(
        private storage: Storage
    ) { }

    get<T>(name: string) {
        return this.collections.find(({ name: _name }) => _name === name) as Collection<T>;
    }

    create<T>(name: string) {
        const collection = Collection.populate<T>(this.storage, name);
        this.collections.push(collection);
        return collection;
    }

}
