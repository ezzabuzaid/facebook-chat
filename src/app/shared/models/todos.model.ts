import { Form, Field, EFieldType, SelectField, ngTableSetting, ISetting } from '@shared/common';
import { Validators } from '@angular/forms';
import { Constants } from '@core/constants';
import { IModule } from './generic-module';

const writeForm = new Form<TodosModel.ITodo>([
    new Field('title', {
        validation: { validators: [Validators.required] },
        value: null,
        type: EFieldType.TEXT,
        label: 'Title',
        section: 'name',
    }),
    new SelectField('userId', {
        validation: {
            validators: [Validators.required]
        },
        value: null,
        type: EFieldType.SELECT,
        label: 'Users',
        options: [{ title: 'User 1', value: 'option' }]
    }),
    new Field('completed', {
        value: false,
        type: EFieldType.CHECKBOX,
        label: 'Radio Select',
    })
]);

export namespace TodosModel {
    export interface ITodo {
        userId: number;
        id: number;
        title: string;
        completed: boolean;
    }

    export const MODULE: IModule<ITodo, ITodo, ITodo> = {
        name: Constants.Routing.Todos.withoutSlash,
        httpConfiguration: {
            DEFAULT_URL: false,
        },
        endpoint: 'https://jsonplaceholder.typicode.com/todos',
        create: {
            title: 'Create Todo',
            form: writeForm,
        },
        update: {
            // TODO: an option for dialog
            title: 'Update Todo',
            form: writeForm
        },
        read: {
            title: 'Todos list',
            settings: ngTableSetting<ITodo>({
                columns: {
                    id: {
                        title: 'Id',
                        type: 'string',
                    },
                    title: {
                        title: 'Title',
                        type: 'string',
                    },
                    completed: {
                        title: 'Completed',
                        type: 'string',
                    },
                    userId: {
                        title: 'User',
                        // TODO: fetch the user
                        type: 'string',
                    },
                    // settingType: {
                    //     title: 'Setting type',
                    //     type: 'number',
                    //     valuePrepareFunction: (column, row) => SettingModel.ESettingType[column],
                    //     filter: listFilter({
                    //         list: AppUtils.mapToTitleValueKeyPairs(SettingModel.ESettingType)
                    //     })
                    // }
                },
            }),
        }
    };
}
