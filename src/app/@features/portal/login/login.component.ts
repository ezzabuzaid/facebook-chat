
import { Component, OnInit } from '@angular/core';
import { PortalModel } from '@features/portal/portal.model';
import { CrudUtils } from '@widget/form';
import { PortalService } from '../portal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends CrudUtils<PortalModel.LoginPost> implements OnInit {
  constructor(
    private portalService: PortalService,
  ) {
    super(new PortalModel.LoginPost());
  }

  ngOnInit() {
  }

  login() {
    const { valid, value } = this.Form;
    if (valid) {
<<<<<<< HEAD
      this.portalService.login(value);
=======
      this.portalService.login(value)
        .subscribe(
          data => {
            this.localstorage.set('token', data.token);
            this.router.navigate(['/', 'articles']);
          },
          error => {
            this.snackbar.open(error.message);
          });
>>>>>>> dd4a445653d6399de285c158a71709e42460d200
    }
  }

}
