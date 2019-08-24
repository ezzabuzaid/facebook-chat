import { Validators, FormControl } from '@angular/forms';
import { FieldValidation, ValidationPattern } from '@shared/validation';

export namespace PortalModel {
    export class LoginPost {
        email = new FormControl(null, Validators.required);
        password = new FormControl(null, Validators.required);
    }

    export class RegisterPost {
        firstName = new FormControl(null, [Validators.required, Validators.pattern(ValidationPattern.ENGLISH_ARABIC_LETTER)]);
        lastName = new FormControl(null, [Validators.required, Validators.pattern(ValidationPattern.ENGLISH_ARABIC_LETTER)]);
        email = new FormControl(null, [Validators.required, ...FieldValidation.EMAIL]);
        password = new FormControl(null, [Validators.required, ...FieldValidation.PASSWORD]);
    }
}
