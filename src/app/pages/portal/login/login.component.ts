import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@shared/account';
import { Validators } from '@angular/forms';
import { Constants } from '@core/constants';
import { PortalModel } from '@shared/models';
import { Field, EFieldType, Form } from '@partials/form';

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
      validation: {
        validators: [Validators.required]
      }
    }),
    Field.Password('password')
  ]);

  constructor(
    private portalService: UserService,
    private router: Router
  ) { }

  ngOnInit() { }

  login({ valid, value }) {
    if (valid) {
      this.portalService
        .login(value, this.rememberMeCheckBox.value)
        .subscribe(() => {
          this.router.navigateByUrl(Constants.Routing.DEFAULT.withSlash);
        });
    }
  }

}
