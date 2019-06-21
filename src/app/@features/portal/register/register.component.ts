
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PortalModel } from '@features/portal/portal.model';
import { Router } from '@angular/router';
import { CrudUtils } from '@widget/form';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends CrudUtils<PortalModel.RegisterPost> implements OnInit {
  constructor(
    private router: Router
  ) {
    super(new PortalModel.RegisterPost());
  }

  ngOnInit() { }

  register() {
    if (this.Form.valid) { }
    // this.router.navigate(['/portal/register']);
  }

}
