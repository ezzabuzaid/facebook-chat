import { FormGroup } from '@angular/forms';

export * from './form.component';
export * from './form.module';
export * from './form.service';

export class CrudUtils<T> {
    Form: FormGroup;

    // TODO add model type
    constructor(schema) {
        this.Form = new FormGroup(schema);
    }

    getName(name: keyof T) {
        return name;
    }

    // TODO the errorName must be within a set of predefined errors name
    getError(fieldName: string, errorName: string) {
        return this.Form.get(fieldName).hasError(errorName);
    }

}

// TODO find a way to get the type of the formControl value
export type FormValue<T> = {
    [P in keyof T]: any;
} & { id: number };

