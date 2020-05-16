import { FormControl, AbstractControlOptions, FormGroup, ValidatorFn, Validators, AbstractControl } from '@angular/forms';
import { AppUtils } from '@core/helpers/utils';
import { Type } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';

export * from './material.module';
export * from './breakpoints';
export * from './ng-smart-table';
export * from './extract';
export * from './navigator';
export * from './window';
export * from './route';
export * from './network-connectivity';

export enum EFieldType {
    TEXT,
    TEXTAREA,
    SELECT,
    PASSWORD,
    EMAIL,
    DATE,
    DATETIME,
    CHECKBOX,
    RADIO,
    NUMBER,
    TEL,
    COUNTRY,
}

export class SelectOption {
    constructor(
        public value: string,
        public key: string | number
    ) { }
}

export interface IField<T, fieldName> extends FormControl {
    id: string;
    name: fieldName;
    type: EFieldType;
    label: string;
    hint: string;
    value: T;
    section: number;
    validation: AbstractControlOptions;
    options?: Observable<SelectOption[]>;
    multiple?: boolean,
    autocomplete?: string;
    min?: T;
    max?: T;
    typeOf(type: EFieldType): boolean;
    addValidator(...validator: ValidatorFn[]): void;
}

export class Field<T, fieldName> extends FormControl implements IField<T, fieldName> {
    public type: EFieldType = null;
    public section: number = null;
    public label: string = null;
    public hint: string;
    public value: T = null;
    public id = null;
    public autocomplete = '';
    public validation: AbstractControlOptions = {
        validators: [],
        asyncValidators: [],
        updateOn: 'change'
    };
    constructor(
        public name: fieldName,
        {
            validation = null,
            value = null,
            type,
            label,
            section,
            id,
            autocomplete,
            hint
        }: Partial<IField<T, fieldName>> = {}
    ) {
        super(value, validation);
        this.value = value;
        this.type = type || EFieldType.TEXT;
        this.section = section ?? 0;
        this.label = label ?? (this.name as any);
        this.id = id || AppUtils.generateAlphabeticString(5);
        this.autocomplete = autocomplete;
        this.hint = hint;
    }

    addValidator(...validator: ValidatorFn[]) {
        this.setValidators(Validators.compose([this.validator, ...validator]));
    }

    public typeOf(type: EFieldType) {
        return this.type === type;
    }

    getElement() {
        return document.getElementById(this.id);
    }

    on(eventName: keyof HTMLElementEventMap) {
        return fromEvent(this.getElement(), eventName);
    }


}

export class SelectField<T, fieldName> extends Field<T, fieldName> implements IField<T, fieldName> {
    public options: Observable<SelectOption[]> = null;
    public multiple = false;
    constructor(
        public name: fieldName,
        option: Partial<SelectField<T, fieldName>>
    ) {
        super(name, option);
        this.type = EFieldType.SELECT;
        this.options = option.options;
        this.multiple = option.multiple;
    }
}
export class DateField<fieldName> extends Field<Date, fieldName> implements IField<Date, fieldName> {
    public min: Date;
    public max: Date;
    public value: Date = null;
    constructor(
        public name: fieldName,
        option: Partial<DateField<fieldName>>
    ) {
        super(name, option);
        this.value = option.value;
        this.type = EFieldType.DATE;
        this.min = option.min;
        this.max = option.max;
    }
}

export class Form<T> extends FormGroup {
    public name: string;
    constructor(
        public fields: (IField<T[keyof T], keyof T> | Form<any>)[],
        validation?: AbstractControlOptions,
    ) {
        super((() => {
            return fields.reduce((acc, field) => {
                if (AppUtils.isNullorUndefined(acc[field.name as string])) {
                    acc[field.name as string] = field;
                    return acc;
                }
                throw new TypeError(`${field.name} field already registered`);
            }, {});
        })(), validation);
    }

    withName(name: string) {
        this.name = name;
        return this;
    }

    getComponent<Y>(component: Type<Y>): Y {
        return null as Y;
    }

    // @ts-ignore
    get(name: keyof T): Field<keyof T, T[keyof T]> {
        return super.get(name as any) as any;
    }


    getName(name: keyof T) {
        return name;
    }

    hasControlError(name: keyof T, errorName: string) {
        return this.get(name).hasError(errorName);
    }

    getControlValue(name: keyof T, defaultValue?: T[keyof T]) {
        return this.get(name).value || defaultValue;
    }

}
export interface IComponentField {
    field: Field<any, any>;
}

export class FieldSet {
    constructor() {

    }
}

