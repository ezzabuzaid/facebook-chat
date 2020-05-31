import { AbstractControl, ValidatorFn } from '@angular/forms';

export function createValidator(errorName: string, validator: (control: AbstractControl) => boolean): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control) {
            return validator(control) ? null : { [errorName]: true };
        }
        return null;
    };
}


export const ContainsUppercase = () => createValidator('uppercase', (control) => /[A-Z]/.test(control.value));
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
