
import { Component, OnInit } from '@angular/core';
import { PortalModel } from '../portal.model';
import { Router } from '@angular/router';
import { Constants } from '@core/constants';
// TODO: replace it with @document strategy
import { LocalStorage } from '@core/helpers/localstorage';
import { UserService } from '@shared/user';
import { FormUtils } from '@partials/form';
import { Field, EFieldType, Form } from '@shared/common';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormUtils<PortalModel.ILogin> implements OnInit {
  constructor(
    private portalService: UserService,
    // private localStorage: LocalStorage,
    private router: Router
  ) {
    super(
      new Form([
        new Field('username', {
          label: 'Username',
          validation: {
            validators: Validators.required
          }
        }),
        new Field('password', {
          label: 'Password',
          validation: {
            validators: Validators.required
          }
        }),
      ])
    );
  }

  ngOnInit() { }

  login() {
    const { valid, value } = this.form;
    if (valid) {
      this.portalService.login(value)
        .subscribe(data => {
          console.log('Component data', data);
          this.router.navigateByUrl(Constants.Routing.Users.withSlash);
        });
    }
  }

}
