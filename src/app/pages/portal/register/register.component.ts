
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { PortalModel } from '../portal.model';
import { UserService } from '@shared/user';
import { FormUtils } from '@partials/form';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends FormUtils<PortalModel.RegisterPost> implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private snackbar: MatSnackBar,
  ) {
    super(new PortalModel.RegisterPost());
  }

  ngOnInit() { }

  register() {
    const { valid, value } = this.Form;
    if (valid) {
      this.userService.register(value);
    }
  }


}
