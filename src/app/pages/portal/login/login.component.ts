
import { Component, OnInit } from '@angular/core';
import { PortalModel } from '../portal.model';
import { Router } from '@angular/router';
import { UserService } from '@shared/user';
import { FormUtils } from '@partials/form';
import { Field, Form } from '@shared/common';
import { Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material';

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

  login(rememberMeCheckBox: MatCheckbox) {
    const { valid, value } = this.form;
    if (valid) {
      this.portalService.login(value)
        .subscribe(data => {
          if (rememberMeCheckBox.checked) {
            // TODO save the token
          }
          console.log('Component data', data);
          // this.router.navigateByUrl(Constants.Routing.Users.withSlash);
        });
    }
  }

}
