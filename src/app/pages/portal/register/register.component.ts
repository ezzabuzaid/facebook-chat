
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { PortalModel } from '../portal.model';
import { UserService } from '@shared/user';
import { FormUtils } from '@partials/form';
import { Form } from '@shared/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends FormUtils<PortalModel.Register> implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private snackbar: MatSnackBar,
  ) {
    super(new Form<PortalModel.Register>([]));
  }

  ngOnInit() { }

  register() {
    const { valid, value } = this.form;
    if (valid) {
      this.userService.register(value);
    }
  }


}
