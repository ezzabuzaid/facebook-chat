
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
      this.portalService.login(value);
    }
  }

}
