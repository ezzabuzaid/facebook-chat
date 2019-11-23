import { IModule } from './generic-module';
import { Constants } from '@core/constants';
import { Field, Form, EFieldType, SelectField, ngTableSetting } from '@shared/common';
import { Validators } from '@angular/forms';
const writeForm = new Form<UsersModel.IUser>([
    new Field('name', {
        validation: { validators: [Validators.required] },
        value: null,
        type: EFieldType.TEXT,
        label: 'Name',
        section: 'name',
    }),
    new Field('username', {
        validation: {
            validators: [Validators.required]
        },
        value: null,
        type: EFieldType.TEXT,
        label: 'Username',
    }),
    new Field('email', {
        value: false,
        type: EFieldType.EMAIL,
        label: 'Email',
    }),
    new Field('phone', {
        value: false,
        type: EFieldType.TEL,
        label: 'Phone',
    }),
    new Field('website', {
        value: false,
        type: EFieldType.TEXT,
        label: 'Website',
    })
]);
export namespace UsersModel {

    export interface IUser {
        id: number;
        name: string;
        username: string;
        email: string;
        address: Address;
        phone: string;
        website: string;
        company: Company;
    }

    interface Company {
        name: string;
        catchPhrase: string;
        bs: string;
    }

    interface Address {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: Geo;
    }

    interface Geo {
        lat: string;
        lng: string;
    }


    export const MODULE: IModule<IUser, IUser, IUser> = {
        name: Constants.Routing.Users.withoutSlash,
        endpoint: 'https://jsonplaceholder.typicode.com/users',
        httpConfigure: {
            disableDefaultUrl: true,
        },
        create: {
            title: 'Create User',
            form: writeForm,
        },
        update: {
            // TODO: an option for dialog
            title: 'Update User',
            form: writeForm
        },
        read: {
            title: 'Users list',
            settings: ngTableSetting<IUser>({
                columns: {
                    id: {
                        title: 'Id',
                        type: 'string',
                    },
                    name: {
                        title: 'Name',
                        type: 'string',
                    },
                    website: {
                        title: 'Website',
                        type: 'string',
                    },
                    username: {
                        title: 'Username',
                        type: 'string',
                    },
                    email: {
                        title: 'Username',
                        type: 'string',
                    },
                    phone: {
                        title: 'Phone',
                        type: 'string',
                    },
                },
            }),
        }
    };
}
