
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@shared/user';
import { Field, Form, EFieldType } from '@shared/common';
import { Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { TokenService } from '@core/helpers/token';
import { Constants } from '@core/constants';
import { PortalModel } from '@shared/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    class: 'bg--primary'
  }
})
export class LoginComponent implements OnInit {
  form = new Form<PortalModel.ILoginRequest>([
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
    })
  ]);

  constructor(
    private portalService: UserService,
    private tokenHelper: TokenService,
    private router: Router
  ) { }

  ngOnInit() { }

  login({ valid, value }, rememberMeCheckBox: MatCheckbox) {
    if (valid) {
      this.portalService.login(value)
        .subscribe(data => {
          this.tokenHelper.setToken(data.token, data.refreshToken, rememberMeCheckBox.checked);
          this.router.navigateByUrl(Constants.Routing.SESSIONS.withSlash);
        });
    }
  }

}
