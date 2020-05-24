import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@shared/user';
import { Field, Form, EFieldType } from '@shared/common';
import { Validators } from '@angular/forms';
import { TokenHelper } from '@core/helpers/token';
import { Constants } from '@core/constants';
import { PortalModel } from '@shared/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    class: 'bg--primary d-block h-100'
  }
})
export class LoginComponent implements OnInit {
  rememberMeCheckBox = new Field('name', {
    type: EFieldType.CHECKBOX,
    value: true,
    label: 'Remember me!',
  });
  form = new Form<PortalModel.ILoginRequest>([
    new Field('username', {
      label: 'placeholder_username',
      autocomplete: 'username',
      section: 0,
      validation: {
        validators: Validators.required
      }
    }),
    new Field('password', {
      label: 'placeholder_passowrd',
      type: EFieldType.PASSWORD,
      section: 1,
      hint: 'at least 8 charachter',
      autocomplete: 'current-password',
      validation: {
        validators: Validators.required
      }
    })
  ]);

  constructor(
    private portalService: UserService,
    private tokenHelper: TokenHelper,
    private router: Router
  ) { }

  ngOnInit() { }

  login({ valid, value }) {
    if (valid) {
      this.portalService.login(value)
        .subscribe(data => {
          this.tokenHelper.setToken(data.token, data.refreshToken, this.rememberMeCheckBox.value);
          this.router.navigateByUrl(Constants.Routing.DEFAULT.withSlash);
        });
    }
  }

}
