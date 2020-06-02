import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { EFieldType, Field, Form, SubmitEvent } from '@partials/form';
import { UserService } from '@shared/account';
import { _extract } from '@shared/common';
import { PortalModel } from '@shared/models';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  host: {
    class: 'bg--primary d-block h-100'
  }
})
export class ForgetPasswordComponent implements OnInit {
  verificationForm = new Form<PortalModel.IForgotPassword>([
    new Field('username', {
      label: _extract('placeholder_username'),
      autocomplete: 'username',
      section: 0,
      value: 'profile',
      validation: {
        validators: Validators.required
      }
    }),
    new Field('firstName', {
      label: _extract('placeholder_firstname'),
      autocomplete: 'given-name',
      section: 2,
      value: 'ezz',
      validation: {
        validators: Validators.required
      }
    }),
    new Field('lastName', {
      label: _extract('placeholder_lastname'),
      autocomplete: 'family-name',
      section: 2,
      value: 'abuzaid',
      validation: {
        validators: Validators.required
      }
    }),
    new Field('placeOfBirth', {
      label: _extract('placeholder_place_of_birth'),
      autocomplete: 'country-name',
      type: EFieldType.COUNTRY,
      section: 1,
      value: 'jo',
      validation: {
        validators: [Validators.required]
      }
    }),
  ]);
  forgotPasswordForm = new Form<{ email: string, mobile: string }>([
    new Field('email', {
      type: EFieldType.EMAIL,
      autocomplete: 'email',
      value: 'admin@admin.com'
    }),
    new Field('mobile', {
      type: EFieldType.TEL,
      autocomplete: 'mobile',
    })
  ]);

  accountVerificationResponse: PortalModel.AccountVerifiedResponse = null;

  steps = [false, false, false];

  constructor(
    private readonly userService: UserService,
  ) { }

  ngOnInit() {
    this.goToStep(1);
    this.verificationForm.patchValue({ username: 'profile', firstName: 'ezz', lastName: 'abuzaid', placeOfBirth: 'jo' });
    this.forgotPasswordForm.patchValue({ email: 'admin@admin.com' })
  }

  checkUser(event: SubmitEvent) {
    if (event.valid) {
      this.userService.checkIfAccountIsExist(event.value)
        .subscribe((response) => {
          this.goToStep(2);
          this.accountVerificationResponse = response;
        });
    }
  }

  sendPincode(event: SubmitEvent) {
    this.userService
      .sendPincode({
        type: this.sendPincodeType,
        ...event.value
      })
      .subscribe(() => {
        this.goToStep(3);
      })
  }

  get sendPincodeType() {
    return this.forgotPasswordForm.get('email') ? 'email' : 'sms';
  }

  checkPincode(pincode: string) {
    console.log(pincode);
    this.userService.checkPincode(pincode)
      .subscribe(() => {
        this.goToStep(4);
      })
  }

  goToStep(index: number) {
    this.steps.fill(false);
    this.forgotPasswordForm.reset();
    this.verificationForm.reset();
    this.steps[index - 1] = true;
  }

}
