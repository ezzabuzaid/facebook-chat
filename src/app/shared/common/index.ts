import { Validators, AbstractControl, ValidatorFn, FormControl, AsyncValidatorFn, AbstractControlOptions, FormGroup } from '@angular/forms';

export * from './material.module';
export * from './breakpoints';
export * from './ng-smart-table';
export * from './extract';

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
    label: string;
    value: string;
}

export interface IField<Tname, T = any> extends FormControl {
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

export class Field<Tname> extends FormControl implements IField<Tname> {
    public type: EFieldType = null;
    public label: string = null;
    public value: any = null;
    public section: string = null;
    public validation: AbstractControlOptions = {
        validators: [],
        asyncValidators: [],
        updateOn: 'change'
    };
    constructor(
        public name: Tname,
        {
            validation,
            value,
            type,
            label,
            section
        }: Partial<Field<Tname>>
    ) {
        super(value, validation);
        this.type = type;
        this.section = section;
        this.label = label;
    }

    public typeOf(type: EFieldType) {
        return this.type === type;
    }

}

export class SelectField<Tname, T = string | string[]> extends Field<Tname> implements IField<Tname, T> {
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
export class DateField<Tname> extends Field<Tname> implements IField<Tname, Date> {
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

export class Form<T = any> extends FormGroup {
    // TODO: Check if two fields has the same name
    constructor(
        public fields: IField<keyof T>[],
        validation?: AbstractControlOptions,
    ) {
        super({}, validation);
        this.fields.forEach((field) => {
            this.addControl(field.name as any, field);
        });
    }
}
