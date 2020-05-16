import { Component, OnInit } from '@angular/core';
import { Form, Field, EFieldType, DateField, _extract } from '@shared/common';
import { Validators } from '@angular/forms';
import { PortalModel } from '@shared/models';
import { SubmitEvent } from '@partials/form';
import { UserService } from '@shared/user';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  host: {
    class: 'bg--primary d-block h-100'
  }
})
export class ForgetPasswordComponent implements OnInit {
  form = new Form<PortalModel.IForgotPassword>([
    new Field('firstName', {
      label: _extract('placeholder_firstname'),
      autocomplete: 'given-name',
      section: 0,
      validation: {
        validators: Validators.required
      }
    }),
    new Field('lastName', {
      label: _extract('placeholder_lastname'),
      autocomplete: 'family-name',
      section: 0,
      validation: {
        validators: Validators.required
      }
    }),
    new Field('placeOfBirth', {
      label: _extract('placeholder_place_of_birth'),
      type: EFieldType.COUNTRY,
      section: 2,
      validation: {
        validators: [Validators.required]
      }
    }),
    new DateField('dateOfBrith', {
      label: _extract('placeholder_date_of_birth'),
      section: 2,
      max: new Date(),
      validation: {
        validators: [Validators.required]
      }
    }),
  ]);

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
  }

  onSubmit(event: SubmitEvent) {
    if (event.valid) {
      this.userService.checkIfAccountIsExist(event.value).subscribe()
    }
  }

}
