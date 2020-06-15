import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from '@core/constants';
import { EFieldType, Field, Form } from '@ezzabuzaid/ngx-form-factory';
import { UserService } from '@shared/account';
import { Fields, RouteUtility } from '@shared/common';
import { PortalModel } from '@shared/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    class: 'bg--primary d-block h-100'
  },
  providers: [RouteUtility]
})
export class LoginComponent implements OnInit {
  rememberMeCheckBox = new Field<boolean>({
    type: EFieldType.CHECKBOX,
    value: true,
    label: 'Remember me!',
  });
  form = new Form<PortalModel.ILoginRequest>({
    username: new Field({
      label: 'placeholder_username',
      autocomplete: 'username',
      validatorOrOpts: Validators.required
    }),
    password: Fields.Password()
  });

  constructor(
    private readonly portalService: UserService,
    private readonly router: Router,
    private routeUtility: RouteUtility
  ) { }

  ngOnInit() { }

  login({ valid, value }) {
    if (valid) {
      this.portalService
        .login(value, this.rememberMeCheckBox.value)
        .subscribe(() => {
          this.navigate();
        });
    }
  }

  navigate() {
    const redirectUrl = this.routeUtility.redirectUrl();
    this.router.navigateByUrl(redirectUrl ?? Constants.Routing.DEFAULT.withSlash);
  }

}
