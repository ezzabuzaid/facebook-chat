import { Injectable } from '@angular/core';
import { Collection } from '@shared/services/database/database-collection';
import { FormValue } from '@widget/form';
import { DatabaseService } from '@shared/services/database';
import { ArticlesModel } from './articles.model';

@Injectable()
export class ArticlesController<T extends { id: number }> {
    private collection: Collection<T>;
    constructor(
        private database: DatabaseService
    ) {
        this.collection = this.database.collection('articles');
    }

    create(payload: T) {
        //  NOTE no validation on schema since the Form validation will gurantee that.
        return this.collection.create(payload);
    }

    get(id: number) {
        const entity = this.collection.getById(id);
        if (!!entity) {
            return entity;
        }
        throw new Error('entity not exist');
    }

    getAll() {
        return this.collection.cursor();
    }

    update(payload: T) {
        const entity = this.collection.put(payload);
        if (!!entity) {
            return entity;
        }
        throw new Error('Article is not exist');
    }

    delete(id: number) {
        const entity = this.collection.delete(id);
        if (!!entity) {
            return entity;
        }
        throw new Error('Article is not exist');
    }

}
