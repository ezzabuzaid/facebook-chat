import { Storage, Entity } from '.';

// NOTE this class return pure object and not model that encapsulate the object

export class Collection<T> {

    private constructor(
        private storage: Storage,
        public name: string,
    ) { }

    static populate<Y>(storage: Storage, name: string) {
        return new Collection<Y>(storage, name);
    }

    private _update(cursor) {
        this.storage.set(this.name, cursor);

    }

    create(entity: Entity<T>): Entity<T> {
        const cursor = this.cursor();
        entity['id'] = cursor.length;
        cursor.push(entity);
        this._update(cursor);
        return entity;
    }

    put(entity: Entity<T>): Entity<T> {
        const cursor = this.cursor();
        const _entity = _get.call({ cursor }, entity.id);
        if (!_entity) {
            return null;
        }
        const oldEntity = cursor[entity.id];
        cursor[entity.id] = entity;
        this._update(cursor);
        return oldEntity;
    }

    delete(id: number): Entity<T> {
        const cursor = this.cursor();
        const entity = _get.call({ cursor }, id);
        if (!entity) {
            return null;
        }
        cursor.splice(id, 1);
        this._update(cursor);
        return entity;
    }

    set(entity: Entity<T>): Entity<T> {
        return this.put(entity) || this.create(entity);
    }

    getById(id: number) {
        const cursor = this.cursor();
        return cursor.find(({ id: _id }: any) => _id === id);
    }

    fetch(attr: string, value) {
        const cursor = this.cursor();
        return cursor.find(entity => entity[attr] === value);
    }

    cursor() {
        return this.storage.get<T[]>(this.name) || [];
    }

}

function _get(id: number) {
    return this.cursor.find(({ id: _id }) => _id === id);
}
