import { Component, OnInit, Inject } from '@angular/core';
import { Form, Field, EFieldType, DateField, _extract } from '@shared/common';
import { Validators } from '@angular/forms';
import { PortalModel } from '@shared/models';
import { SubmitEvent } from '@partials/form';
import { UserService } from '@shared/account';
import { PincodeBoxDialog, PincodeBoxDialogHandler } from '@widget/pincode-box/pincode-box.component';

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

  forgotPasswordForm = new Form([
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

  accountVerifiedResponse: PortalModel.AccountVerifiedResponse = null;

  steps = [false, false, false];

  constructor (
    private userService: UserService,
    @Inject(PincodeBoxDialog) private openPinCodeDialog: PincodeBoxDialogHandler
  ) { }

  ngOnInit() {
    this.goToStep(1);
  }

  checkUser(event: SubmitEvent) {
    if (event.valid) {
      this.userService.checkIfAccountIsExist(event.value)
        .subscribe((response) => {
          this.goToStep(2);
          this.accountVerifiedResponse = response;
        });
    }
  }

  submitVerification() {
    if (this.isEmailVerification) {
      this.userService
        .sendEmailForgotPassword(this.forgotPasswordForm.get('email').value)
        .subscribe(() => {
          this.goToStep(3);
        })
    } else {
      this.openPinCodeDialog({
        proxy: 'sms',
        type: 'account'
      });
    }
  }

  get isEmailVerification() {
    return this.forgotPasswordForm.get('email');
  }

  goToStep(index: number) {
    this.steps.fill(false);
    this.forgotPasswordForm.reset();
    this.form.reset();
    this.steps[index - 1] = true;
  }

}
