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

export class Field extends FormControl {
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
        public name: string,
        {
            validation,
            value,
            type,
            label,
            section
        }: Partial<Field>
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

interface IOption {
    label: string;
    value: string;
}

export class SelectField<T> extends Field {
    public options: IOption[] = [];
    public value: T = null;
    constructor(
        public name: string,
        option: Partial<SelectField<T>>
    ) {
        super(name as any, option);
        this.options = option.options;
        this.value = option.value as any;
    }
}

export class Form extends FormGroup {
    constructor(
        public fields: Field[],
        validation?: AbstractControlOptions,
    ) {
        super({}, validation);
        this.fields.forEach((field) => {
            this.addControl(field.name, field);
        });
    }
}

