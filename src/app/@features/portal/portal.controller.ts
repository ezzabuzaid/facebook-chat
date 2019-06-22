import { Injectable } from '@angular/core';
import { Collection } from '@shared/services/database/database-collection';
import { DatabaseService } from '@shared/services/database/database.service';

@Injectable()
export class PortalController<T> {
    // NOTE unfortunately until this moment i can't figure out how to get the type of formControl
    // NOTE you can create an interface without using my way of creating form model this will give you a good typing.
    collection: Collection<T>;
    constructor(
        private database: DatabaseService
    ) {
        this.collection = this.database.collection<T>('users');
    }

    create(user: T) {
        const entity = this.collection.fetch('email', user['email']);
        if (entity) {
            throw new Error('User exist');
        }
        return this.collection.create(user);
    }

    private generateToken() {
        const token = Math.random().toString(36).substr(2);
        return `${token}.${token}`;
    }

    login(creds: { email: string, password: string }) {
        const entity = this.collection.fetch('email', creds.email);
        if (entity && entity['password'] === creds.password) {
            return {
                ...entity,
                token: this.generateToken()
            };
        }
        throw new Error('Please try again');
    }

}
