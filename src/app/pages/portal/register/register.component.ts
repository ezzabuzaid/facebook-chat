
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PortalModel } from '../../../shared/models/portal.model';
import { UserService } from '@shared/user';
import { FormUtils } from '@partials/form';
import { Form, Field, SelectField, EFieldType } from '@shared/common';
import { AppUtils } from '@core/helpers/utils';
import { Constants } from '@core/constants';
import { Validators } from '@angular/forms';
import { MobileControlComponent } from '@widget/mobile-control';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends FormUtils<PortalModel.IRegister> implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
  ) {
    super(new Form<PortalModel.IRegister>([
      new Field('username', {
        label: 'placeholder_username',
        autocomplete: 'username',
        validation: { validators: [Validators.required] }
      }),
      new Field('email', {
        type: EFieldType.EMAIL,
        autocomplete: 'email',
        label: 'placeholder_email',
        validation: { validators: [Validators.required] }
      }),
      new Field('password', {
        type: EFieldType.PASSWORD,
        autocomplete: 'new-password',
        label: 'placeholder_password',
        validation: { validators: [Validators.required] }
      }),
      new Field('mobile', {
        type: EFieldType.TEL,
        autocomplete: 'mobile',
        label: 'placeholder_mobile',
        validation: { validators: [Validators.required] }
      }),
      new SelectField<keyof PortalModel.IRegister, PortalModel.ERoles>('role', {
        type: EFieldType.SELECT,
        label: 'placeholder_role',
        validation: { validators: [Validators.required] },
        value: PortalModel.ERoles.SUPERADMIN,
        options: AppUtils.mapEnumToValueAnd(PortalModel.ERoles),
      }),
    ]));
  }
  ngOnInit() { }

  register() {
    const { valid, value } = this.form;
    if (valid) {
      this.userService.register(value)
        .subscribe(() => {
          this.router.navigate([Constants.Routing.LOGIN.withSlash]);
        });
    }
  }


}
