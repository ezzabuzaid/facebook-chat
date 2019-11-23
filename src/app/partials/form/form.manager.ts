import { Listener } from '@core/helpers/listener';

export class FormWidgetManager extends Listener<boolean> {
    constructor() {
        super();
    }
}


import { FormGroup, FormControl, AbstractControlOptions } from '@angular/forms';


export class FormUtils<T> {
    public Form: FormGroup;

    constructor(schema: { [key in keyof T]: FormControl }, options: AbstractControlOptions = {}) {
        this.Form = new FormGroup(schema, options);
    }

    getName(name: keyof T) {
        return name;
    }

    getError(fieldName: string, errorName: string) {
        return this.Form.get(fieldName).hasError(errorName);
    }

    getControl(name: keyof T) {
        return this.Form.get(name as any);
    }

    getControlValue<Y>(name: keyof T, defaultValue?: Y) {
        return (this.Form.value[name] || defaultValue) as Y;
    }

}

export type FormValue<T> = {
    [P in keyof T]: any;
};


// TODO: combine this with crud module, this should be the template and the utils for the crud and any another standalone form;
