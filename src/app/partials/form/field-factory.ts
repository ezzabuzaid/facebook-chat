
import { FormControl, AbstractControlOptions, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AppUtils } from '@core/helpers/utils';
import { Type } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';

type FieldName<T> = keyof T extends string ? keyof T : never;
type FieldValue<T, name> = { [key in keyof T]: key extends name ? T[key] : never }[keyof T];

export type OmitProperties<T, P> = Pick<T, { [key in keyof T]: T[key] extends P ? never : key }[keyof T]>;
export type Properties<T> = OmitProperties<T, (...args: any[]) => any>;

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

export interface IField<T> {
    id?: string;
    name?: FieldName<T>;
    type?: EFieldType;
    label?: string;
    hint?: string;
    value?: FieldValue<T, FieldName<T>>;
    section?: number;
    validation?: AbstractControlOptions;
    options?: Observable<SelectOption[]>;
    multiple?: boolean,
    autocomplete?: string;
    min?: Date;
    max?: Date;
    typeOf(type: EFieldType): boolean;
    addValidator(...validator: ValidatorFn[]): void;
}
type Options<T> = Partial<Properties<IField<T>>>;

export class Field<T> extends FormControl implements IField<T> {
    static incremntalSection = -1;
    public type: EFieldType = null;
    public section: number = null;
    public label: string = null;
    public hint: string;
    public value: FieldValue<T, FieldName<T>> = null;
    public id = null;
    public autocomplete = '';

    constructor(
        public name: FieldName<T>,
        options: Options<T> = {}
    ) {
        super(null, options.validation ?? {
            validators: [],
            asyncValidators: [],
            updateOn: 'change'
        });
        this.value = null;
        this.type = options.type || EFieldType.TEXT;
        this.section = options.section ?? ++Field.incremntalSection;
        this.label = options.label ?? (this.name as any);
        this.id = options.id || AppUtils.generateAlphabeticString(5);
        this.autocomplete = options.autocomplete;
        this.hint = options.hint;
    }

    static Password<T>(name: FieldName<T>, options?: Options<T>) {
        return new Field<T>(name, {
            type: EFieldType.PASSWORD,
            autocomplete: 'current-password',
            label: 'placeholder_passowrd',
            validation: {
                validators: [Validators.required]
            },
            ...options
        })
    }

    static Email<T>(name: FieldName<T>, options?: Options<T>) {
        return new Field<T>(name, {
            type: EFieldType.EMAIL,
            autocomplete: 'email',
            label: 'placeholder_email',
            validation: { validators: [Validators.required, Validators.email] },
            ...options
        });
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
export class SelectField<T> extends Field<T> implements IField<T> {
    public options: Observable<SelectOption[]> = null;
    public multiple = false;
    constructor(
        public name: FieldName<T>,
        option: Properties<IField<T>>
    ) {
        super(name, option);
        this.type = EFieldType.SELECT;
        this.options = option.options;
        this.multiple = option.multiple;
    }
}
export class DateField<T = any> extends Field<T> implements IField<T> {
    public min?: Date;
    public max?: Date;
    constructor(
        public name: FieldName<T>,
        option: Properties<IField<T>>
    ) {
        super(name, option);
        this.type = EFieldType.DATE;
        this.min = option.min;
        this.max = option.max;
    }
}
export class Form<T> extends FormGroup {
    public name: string;
    constructor(
        public fields: (IField<T> | Form<any>)[],
        validation?: AbstractControlOptions,
    ) {
        super((() => {
            return fields.reduce((acc, field) => {
                if (AppUtils.isNullorUndefined(acc[field.name as string])) {
                    acc[field.name as string] = field;
                    return acc;
                }
                throw new TypeError(`${ field.name } field already registered`);
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
    get(name: keyof T): Field<keyof T> {
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
    field: Field<any>;
}
export class FieldSet {
    constructor() {

    }
}

