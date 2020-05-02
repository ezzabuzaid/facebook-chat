import { AbstractControl, ValidatorFn } from '@angular/forms';

export * from './equal.validator';
export * from './string.validator';
export * from './numbers.validator';
export * from './phonenumber.validator';

export class ValidationPattern {
   static ENGLISH_ARABIC_LETTER = /^[\w\s\u0621-\u064A]+$/;
   static CONTAINS_DIGITS = /^\d+$/;
}


export function createValidator(errorName: string, validator: (control: AbstractControl) => boolean): ValidatorFn {
   return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control) {
         return validator(control) ? null : { [errorName]: true };
      }
      return null;
   };
}
