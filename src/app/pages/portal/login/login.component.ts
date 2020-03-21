
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@shared/user';
import { FormUtils } from '@partials/form';
import { Field, Form, EFieldType } from '@shared/common';
import { Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { TokenService } from '@core/helpers/token';
import { Constants } from '@core/constants';
import { PortalModel } from '@shared/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormUtils<PortalModel.ILogin> implements OnInit {

  constructor(
    private portalService: UserService,
    private tokenHelper: TokenService,
    private router: Router
  ) {
    super(
      new Form([
        new Field('username', {
          label: 'placeholder_username',
          autocomplete: 'username',
          validation: {
            validators: Validators.required
          }
        }),
        new Field('password', {
          label: 'placeholder_passowrd',
          type: EFieldType.PASSWORD,
          autocomplete: 'current-password',
          validation: {
            validators: Validators.required
          }
        }),
      ])
    );
  }

  ngOnInit() { }

  login(rememberMeCheckBox: MatCheckbox) {
    const { valid, value } = this.form;
    if (valid) {
      this.portalService.login(value)
        .subscribe(data => {
          this.tokenHelper.setToken(rememberMeCheckBox.checked, data.token, data.refreshToken);
          this.router.navigateByUrl(Constants.Routing.SESSIONS.withSlash);
        });
    }
  }

}
