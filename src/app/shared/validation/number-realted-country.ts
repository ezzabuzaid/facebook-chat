import { AbstractControl, ValidatorFn } from '@angular/forms';
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
