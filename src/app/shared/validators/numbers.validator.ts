import { AbstractControl, ValidatorFn } from '@angular/forms';

export function NumberOnly(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (control) {
            return isNaN(control.value) ? { not_number: true } : null;
        }
        return null;
    };
}
