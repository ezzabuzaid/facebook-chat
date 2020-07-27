import { Validators } from '@angular/forms';
import { EFieldType, Field, IFieldOptions } from '@ezzabuzaid/ngx-form-factory';

export class Fields {
    static Password(options?: IFieldOptions<string>) {
        return new Field({
            type: EFieldType.PASSWORD,
            autocomplete: 'current-password',
            label: 'placeholder_passowrd',
            validatorOrOpts: Validators.required,
            ...options
        });
    }

    static Email(options?: IFieldOptions<string>) {
        return new Field({
            type: EFieldType.EMAIL,
            autocomplete: 'email',
            label: 'placeholder_email',
            validatorOrOpts: [Validators.required, Validators.email],
            ...options
        });
    }

}
