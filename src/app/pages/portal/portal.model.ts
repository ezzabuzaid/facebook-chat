import { Validators, FormControl } from '@angular/forms';
import { FieldValidation, ValidationPattern } from '@shared/validation';
import { Field, Form, EFieldType } from '@shared/common';

export namespace PortalModel {
    export interface ILogin {
        username: string;
        password: string;
    }
    // export class Login {
    //     username = new FormControl(null, Validators.required);
    //     password = new FormControl(null, Validators.required);
    // }

    export class Register {
        firstName = new FormControl(null, [Validators.required, Validators.pattern(ValidationPattern.ENGLISH_ARABIC_LETTER)]);
        lastName = new FormControl(null, [Validators.required, Validators.pattern(ValidationPattern.ENGLISH_ARABIC_LETTER)]);
        email = new FormControl(null, [Validators.required, ...FieldValidation.EMAIL]);
        password = new FormControl(null, [Validators.required, ...FieldValidation.PASSWORD]);
    }
}
