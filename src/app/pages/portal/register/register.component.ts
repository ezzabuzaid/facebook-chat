
import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@shared/user';
import { Form, Field, SelectField, EFieldType } from '@shared/common';
import { AppUtils } from '@core/helpers/utils';
import { Constants } from '@core/constants';
import { Validators } from '@angular/forms';
import { PortalModel } from '@shared/models';
import { Observable, merge } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  host: {
    class: 'bg--primary'
  }
})
export class RegisterComponent implements OnInit, AfterViewInit {
  form = new Form<PortalModel.IRegister>([
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
  ]);
  $passwordVisible: Observable<boolean> = null;

  constructor(
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.$passwordVisible = merge(
      this.form.get('password').on('focus').pipe(mapTo(true)),
      this.form.get('password').on('blur').pipe(mapTo(false))
    );
  }

  register({ valid, value }) {
    if (valid) {
      this.userService.register(value)
        .subscribe(() => {
          this.router.navigate([Constants.Routing.LOGIN.withSlash]);
        });
    }
  }


}
