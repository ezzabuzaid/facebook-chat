export * from './validation-password-equivalent';
export * from './number-only';
export * from './number-realted-country';

import { Validators, AbstractControl, ValidatorFn } from '@angular/forms';

export class ValidationPattern {
   static ENGLISH_ARABIC_LETTER = /^[\w\s\u0621-\u064A]+$/;
   static NUMBER_ONLY = /^\d+$/;
}

export class FieldValidation {
   // NOTE: use google lib for phonenumber instead
   static MOBILE = [Validators.minLength(10), Validators.maxLength(10), Validators.pattern(ValidationPattern.NUMBER_ONLY)];

   static EMAIL = [Validators.email];
   static USERNAME = [Validators.pattern(ValidationPattern.ENGLISH_ARABIC_LETTER), Validators.minLength(8), Validators.maxLength(16)];
   static PASSWORD = [Validators.required, Validators.minLength(6), Validators.maxLength(16), Validators.pattern(/\d/)];
}

