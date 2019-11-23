import { Listener } from '@core/helpers/listener';
import { Injectable } from '@angular/core';
import { Form, IField } from '@shared/common';

@Injectable({
    providedIn: 'root'
})
export class FormWidgetManager extends Listener<boolean> {
    constructor() {
        super();
    }
}


export class FormUtils<T> {

    constructor(public form: Form<T>) { }

    getName(name: keyof T) {
        return name;
    }

    getError(fieldName: string, errorName: string) {
        return this.form.get(fieldName).hasError(errorName);
    }

    getControl(name: keyof T) {
        return this.form.get(name as any) as unknown as IField<any>;
    }

    getControlValue<Y>(name: keyof T, defaultValue?: Y) {
        return (this.form.value[name] || defaultValue) as Y;
    }

}

export type FormValue<T> = {
    [P in keyof T]: any;
};
