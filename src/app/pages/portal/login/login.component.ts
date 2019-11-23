
import { Component, OnInit } from '@angular/core';
import { PortalModel } from '../portal.model';
import { Router } from '@angular/router';
import { Constants } from '@core/constants';
// TODO: replace it with @document strategy
import { LocalStorage } from '@core/helpers/localstorage';
import { UserService } from '@shared/user';
import { FormUtils } from '@partials/form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormUtils<PortalModel.LoginPost> implements OnInit {
  constructor(
    private portalService: UserService,
    // private localStorage: LocalStorage,
    private router: Router
  ) {
    super(new PortalModel.LoginPost());
  }

  ngOnInit() { }

  login() {
    const { valid, value } = this.Form;
    if (valid) {
      this.portalService.login(value)
        .subscribe(data => {
          console.log('Component data', data);
          this.router.navigateByUrl(Constants.Routing.Users.withSlash);
        });
    }
  }

}
