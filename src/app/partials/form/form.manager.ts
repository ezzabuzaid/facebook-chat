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

    getError(name: keyof T, errorName: string) {
        return this.getControl(name).hasError(errorName);
    }

    getControl(name: keyof T) {
        return this.form.get(name as any) as IField<keyof T, T[keyof T]>;
    }

    getControlValue(name: keyof T, defaultValue?: T[keyof T]) {
        return this.getControl(name).value || defaultValue;
    }

}
