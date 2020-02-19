import { AbstractControl, ValidatorFn } from '@angular/forms';
import { AppUtils } from '@core/helpers/utils';

/**
 *
 * @param id The id refer to input id
 */
export function PhoneNumberShouldBeAssociatedWithCountry(id: string): ValidatorFn {
   return (control: AbstractControl): { [key: string]: any } | null => {
      const input = document.getElementById(id);
      if (input) {
         const inst = (window as any).intlTelInputGlobals.getInstance(input);
         if (inst) {
            return AppUtils.isFalsy(inst.isValidNumber()) ? { not_associated: true } : null;
         }
      }
      return null;
   };
}
