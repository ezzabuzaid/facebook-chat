import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import { AppUtils } from '@core/helpers/utils';

export function createValidator(errorName: string, validator: (control: AbstractControl, parent: AbstractControl) => boolean): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control) {
            return validator(control, control.parent) ? null : { [errorName]: true };
        }
        return null;
    };
}


export const ContainsUppercase = () => createValidator('uppercase', (control) => /[A-Z]/.test(control.value ?? ''));
export const ContainsLowercase = () => createValidator('lowercase', (control) => /[a-z]/.test(control.value));
export const ContainsNumber = () => createValidator('number', (control) => /\d/.test(control.value));
export const ContainsSpecialCharacter = () => {
    return createValidator('special_character', (control) => /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(control.value));
};

export const Between = (minlength: number, maxlength: number) => {
    return createValidator('between', (control) => length(control.value) > minlength - 1 && length(control.value) < maxlength - 1);
}

function length(value: string) {
    return value && value.length;
}

export const AllEqual = (...names: string[]) => createValidator('equality', (control) => {
    return AppUtils.equals(...names.map(name => control.get(name).value));
});

export const EqualTo = (name: string) => createValidator('equalTo', (control, parent) => {
    return parent?.get(name).value?.trim() === control.value?.trim();
});