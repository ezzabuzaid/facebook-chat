
import { Component, OnInit } from '@angular/core';
import { PortalModel } from '@features/portal/portal.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudUtils } from '@widget/form';
import { PortalService } from '../portal.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends CrudUtils<PortalModel.RegisterPost> implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private portalService: PortalService,
    private snackbar: MatSnackBar,
  ) {
    super(new PortalModel.RegisterPost());
  }

  ngOnInit() { }

  register() {
    const { valid, value } = this.Form;
    if (valid) {
      this.portalService.register(value);
    }
  }


}
