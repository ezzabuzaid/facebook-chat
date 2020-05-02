import { IModule } from './generic-module';
import { Constants } from '@core/constants';
import { Field, Form, EFieldType, SelectField, ngTableSetting } from '@shared/common';
import { Validators } from '@angular/forms';
import { PortalModel } from '@shared/models/portal.model';
import { AppUtils } from '@core/helpers/utils';
import { ListEntityQuery } from './response.model';

const writeForm = new Form<UsersModel.IUser>([
    new Field('username', {
        validation: {
            validators: [Validators.required]
        },
        value: null,
        type: EFieldType.TEXT,
        label: 'placeholder_username',
    }),
    new Field('email', {
        type: EFieldType.EMAIL,
        validation: {
            validators: [Validators.required, Validators.email]
        },
        label: 'placeholder_email',
    }),
    new Field('mobile', {
        type: EFieldType.TEL,
        label: 'placeholder_mobile',
    })
]);
export namespace UsersModel {

    export interface IUser {
        _id: string;
        verified: boolean;
        username: string;
        email: string;
        mobile: string;
        role: number;
        createdAt: string;
        updatedAt: string;
    }

    export class SearchForUserQuery extends ListEntityQuery {
        constructor(public username: string, pageQuery: ListEntityQuery) {
            super(pageQuery);
        }
    }


    export const MODULE: IModule<IUser, IUser, IUser> = {
        name: Constants.Routing.Users.withoutSlash,
        httpConfiguration: {
            DEFAULT_URL: false
        },
        create: {
            title: 'Create User',
            form: writeForm,
        },
        update: {
            title: 'Update User',
            form: writeForm
        },
        read: {
            title: 'Users list',
            endpoint: Constants.API.USERS.base,
            settings: ngTableSetting<IUser>({
                columns: {
                    _id: {
                        title: 'Id',
                        type: 'string',
                    },
                    username: {
                        title: 'Username',
                        type: 'string',
                    },
                    email: {
                        title: 'Email',
                        type: 'string',
                    },
                    mobile: {
                        title: 'Mobile',
                        type: 'string',
                    },
                    role: {
                        title: 'Role',
                        type: 'string',
                        filter: {
                            config: {
                                list: AppUtils.mapEnumToValueAnd(PortalModel.ERoles),
                            },
                        },
                        valuePrepareFunction(column, row) {
                            return PortalModel.ERoles[column];
                        }
                    },
                },
            }),
        }
    };
}
