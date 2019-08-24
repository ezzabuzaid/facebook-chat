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
   static PASSWORD = [Validators.required, Validators.minLength(6), Validators.maxLength(16)];
}

const _window = window as any;
/**
 *
 * @param id The id refer to input id
 */
export function PhoneNumberShouldBeAssociatedWithCountry(id: string): ValidatorFn {
   return (control: AbstractControl): { [key: string]: any } | null => {
      const input = document.getElementById(id);
      if (input) {
         const inst = _window.intlTelInputGlobals.getInstance(input);
         if (inst) {
            return !inst.isValidNumber() ? { not_associated: true } : null;
         }
      }
      return null;
   };
}

export function NumberOnly(): ValidatorFn {
   return (control: AbstractControl): { [key: string]: any } | null => {
      if (control) {
         return isNaN(control.value) ? { not_number: true } : null;
      }
      return null;
   };
}

