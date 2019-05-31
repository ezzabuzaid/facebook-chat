import { Validators } from '@angular/forms';

export class AppValidation {
   static MOBILE = [Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^\d+$/)];
   static EMAIL = [Validators.email];
}
