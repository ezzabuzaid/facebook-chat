import { Injectable } from '@angular/core';
import { PortalModel } from './portal.model';
import { Collection } from '@shared/services/database/database-collection';
import { FormValue } from '@widget/form';
import { DatabaseService } from '@shared/services/database/database.service';

// NOTE This must be injected in portal module, for the sake of speed
@Injectable({ providedIn: 'root' })
export class PortalController {
    // NOTE unfortunately until this moment i can't figure out how to get the type of formControl
    // NOTE you can create an interface without using my way of creating form model this will give you a good typing.
    collection: Collection<FormValue<PortalModel.RegisterPost>>;
    constructor(
        private database: DatabaseService
    ) {
        this.collection = this.database.collection<FormValue<PortalModel.RegisterPost>>('users');
    }

    create(user) {
        const entity = this.collection.fetch('email', user.email);
        console.log(user, entity);
        if (entity) {
            throw new Error('User exist');
        }
        return this.collection.create(user);
    }

}
