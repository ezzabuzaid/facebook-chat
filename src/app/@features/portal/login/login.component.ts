
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PortalModel } from '@features/portal/portal.model';
import { Router } from '@angular/router';
import { CrudUtils } from '@widget/form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends CrudUtils<PortalModel.LoginPost> implements OnInit {
  Form: FormGroup;
  constructor(
    private router: Router
  ) {
    super(new PortalModel.LoginPost());
  }

  ngOnInit() {
  }

  login() {
    // this.router.navigate(['/portal/register']);
  }

}
