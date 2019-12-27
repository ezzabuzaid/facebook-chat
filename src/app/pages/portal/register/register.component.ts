
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { PortalModel } from '../../../shared/models/portal.model';
import { UserService } from '@shared/user';
import { FormUtils } from '@partials/form';
import { Form, Field, SelectField, EFieldType } from '@shared/common';
import { AppUtils } from '@core/helpers/utils';
import { Constants } from '@core/constants';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends FormUtils<PortalModel.IRegister> implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {
    super(new Form<PortalModel.IRegister>([
      new Field('username', {
        label: 'placeholder_username',

      }),
      new Field('email', {
        type: EFieldType.EMAIL,
        label: 'placeholder_email'
      }),
      new Field('password', {
        type: EFieldType.PASSWORD,
        label: 'placeholder_password'
      }),
      new Field('mobile', {
        type: EFieldType.TEL,
        label: 'placeholder_mobile'
      }),
      new SelectField<keyof PortalModel.IRegister, PortalModel.ERoles>('role', {
        type: EFieldType.SELECT,
        label: 'placeholder_role',
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
