
import { Component, OnInit } from '@angular/core';
import { PortalModel } from '@features/portal/portal.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudUtils } from '@widget/form';
import { PortalService } from '../portal.service';
import { MatSnackBar } from '@angular/material';
import { LocalStorage } from '@shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends CrudUtils<PortalModel.LoginPost> implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private portalService: PortalService,
    private snackbar: MatSnackBar,
    private localstorage: LocalStorage
  ) {
    super(new PortalModel.LoginPost());
  }

  ngOnInit() {
  }

  login() {
    const { valid, value } = this.Form;
    if (valid) {
      this.portalService.login(value)
        .subscribe(
          data => {
            this.localstorage.set('token', data.token);
            this.router.navigate(['/', 'articles']);
          },
          error => {
            this.snackbar.open(error.message);
          });
    }
  }

}
