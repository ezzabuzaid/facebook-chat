import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Constants } from '@core/constants';
import { EFieldType, Field, Form, } from '@partials/form';
import { UserService } from '@shared/account';
import { PortalModel } from '@shared/models';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    class: 'bg--primary d-block h-100'
  }
})
export class LoginComponent implements OnInit {
  rememberMeCheckBox = new Field<boolean>('name', {
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
    private readonly portalService: UserService,
    private readonly router: Router,
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
