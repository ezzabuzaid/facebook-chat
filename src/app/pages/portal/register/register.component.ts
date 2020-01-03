
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
    private route: ActivatedRoute,
    private userService: UserService,
  ) {
    super(new Form<PortalModel.IRegister>([
      new Field('username', {
        label: 'placeholder_username',
        validation: { validators: [Validators.required] }
      }),
      new Field('email', {
        type: EFieldType.EMAIL,
        label: 'placeholder_email',
        validation: { validators: [Validators.required] }
      }),
      new Field('password', {
        type: EFieldType.PASSWORD,
        label: 'placeholder_password',
        validation: { validators: [Validators.required] }
      }),
      new Field('mobile', {
        type: EFieldType.TEL,
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
    // TODO: Locked step, the RawField should be finished first in order to to activated this function
    // const country = this.form.getComponent(MobileControlComponent).getCountry();
    if (valid) {
      this.userService.register(value)
        .subscribe(() => {
          this.router.navigate([Constants.Routing.LOGIN.withSlash]);
        });
    }
  }


}
