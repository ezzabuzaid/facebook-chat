import { Validators, AbstractControl, ValidatorFn, FormControl, AsyncValidatorFn, AbstractControlOptions, FormGroup } from '@angular/forms';
import { AppUtils } from '@core/helpers/utils';
import { Type } from '@angular/core';

export * from './material.module';
export * from './breakpoints';
export * from './ng-smart-table';
export * from './extract';
// export * from './network-connectivity';

export enum EFieldType {
    TEXT,
    TEXTAREA,
    SELECT,
    MULTIPLE,
    PASSWORD,
    EMAIL,
    DATE,
    DATETIME,
    CHECKBOX,
    RADIO,
    NUMBER,
    TEL,
}

export interface ISelectOption {
    title: string;
    value: string;
}

export interface IField<Tname, T> extends FormControl {
    id: string;
    name: Tname;
    type: EFieldType;
    label: string;
    value: T;
    section: string;
    validation: AbstractControlOptions;
    options?: ISelectOption[];
    min?: T;
    max?: T;
    typeOf(type: EFieldType): boolean;
}

export class Field<Tname, T> extends FormControl implements IField<Tname, T> {
    public type: EFieldType = null;
    public section: string = null;
    public label: string = null;
    public value: T = null;
    public id = null;
    public validation: AbstractControlOptions = {
        validators: [],
        asyncValidators: [],
        updateOn: 'change'
    };
    constructor(
        public name: Tname,
        {
            validation = null,
            value = null,
            type,
            label,
            section,
            id
        }: Partial<Field<Tname, T>> = {}
    ) {
        super(value, validation);
        this.type = type || EFieldType.TEXT;
        this.section = section;
        this.label = label;
        this.id = id || AppUtils.generateRandomString(10);
    }

    public typeOf(type: EFieldType) {
        return this.type === type;
    }

}

export class SelectField<Tname, T = string | string[]> extends Field<Tname, T> implements IField<Tname, T> {
    public options: ISelectOption[] = [];
    public value: T = null;
    constructor(
        public name: Tname,
        option: Partial<SelectField<Tname, T>>
    ) {
        super(name, option);
        this.options = option.options;
        this.value = option.value as any;
    }
}
export class DateField<Tname> extends Field<Tname, Date> implements IField<Tname, Date> {
    public min: Date;
    public max: Date;
    public value: Date = null;
    constructor(
        public name: Tname,
        option: Partial<DateField<Tname>>
    ) {
        super(name, option);
        this.value = option.value;
    }
}

export class Form<T> extends FormGroup {
    // TODO: Check if two fields has the same name
    constructor(
        public fields: IField<keyof T, T[keyof T]>[],
        validation?: AbstractControlOptions,
    ) {
        super({}, validation);
        this.fields.forEach((field) => {
            this.addControl(field.name as any, field);
        });
    }

    getComponent<Y>(component: Type<Y>): Y {
        return null as Y;
    }
}

export interface IComponentField {
    field: Field<any, any>;
}

// TODO: export this file as library
