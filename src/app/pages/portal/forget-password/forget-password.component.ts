import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Constants } from '@core/constants';
import { AppUtils } from '@core/helpers/utils';
import { EFieldType, Field, Form, SubmitEvent } from '@partials/form';
import { UserService } from '@shared/account';
import { _extract } from '@shared/common';
import { PortalModel } from '@shared/models';
import { AllEqual, Between, ContainsLowercase, ContainsNumber, ContainsSpecialCharacter, ContainsUppercase, EqualTo } from '@shared/validators';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  host: {
    class: 'bg--primary d-block h-100'
  }
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {
  verificationForm = new Form<PortalModel.IForgotPassword>([
    new Field('username', {
      label: _extract('placeholder_username'),
      autocomplete: 'username',
      section: 0,
      validation: {
        validators: Validators.required
      }
    }),
    new Field('firstName', {
      label: _extract('placeholder_firstname'),
      autocomplete: 'given-name',
      section: 2,
      validation: {
        validators: Validators.required
      }
    }),
    new Field('lastName', {
      label: _extract('placeholder_lastname'),
      autocomplete: 'family-name',
      section: 2,
      validation: {
        validators: Validators.required
      }
    }),
    new Field('placeOfBirth', {
      label: _extract('placeholder_place_of_birth'),
      autocomplete: 'country-name',
      type: EFieldType.COUNTRY,
      section: 1,
      validation: {
        validators: [Validators.required]
      }
    }),
  ]);

  sendPincodeForm = new Form<{ email: string, mobile: string }>([
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

  resetPasswordForm = new Form<{ password: string, confirmPassword: string }>([
    Field.Password('password', {
      autocomplete: 'off',
      hint: 'at least 8 charachter',
      validation: {
        validators: [
          Validators.required,
          Between(8, 16),
          ContainsUppercase(),
          ContainsLowercase(),
          ContainsSpecialCharacter(),
          ContainsNumber()
        ]
      }
    }),
    Field.Password('confirmPassword', {
      autocomplete: 'off',
      validation: {
        validators: [
          Validators.required,
          EqualTo('password')
        ]
      }
    })
  ], {
    validators: AllEqual('password', 'confirmPassword')
  });

  accountVerificationResponse: PortalModel.AccountVerifiedResponse;
  pincode = null;
  steps = Array.from({ length: 4 });
  subscription = new Subject();

  constructor(
    private userService: UserService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.goToStep(1);
    this.verificationForm.patchValue({ username: 'profile', firstName: 'ezz', lastName: 'abuzaid', placeOfBirth: 'jo' });
    this.sendPincodeForm.patchValue({ email: 'admin@admin.com' })
    this.resetPasswordForm.valueChanges
      .pipe(takeUntil(this.subscription))
      .subscribe(() => {
        this.resetPasswordForm.updateValueAndValidity({ emitEvent: false, onlySelf: false });
      });
  }

  checkUser(event: SubmitEvent) {
    if (event.valid) {
      this.userService.checkIfAccountIsExist(event.value)
        .subscribe((response) => {
          this.nextStep();
          this.accountVerificationResponse = response;
        });
    }
  }

  sendPincode(event: SubmitEvent) {
    console.log(this.accountVerificationResponse);
    this.userService
      .sendPincode({
        type: this.sendPincodeType,
        id: this.accountVerificationResponse.id,
        ...event.value
      })
      .subscribe(() => {
        this.nextStep();
        console.log(this.sendPincodeForm.value);
      })
  }

  get sendPincodeType() {
    return this.sendPincodeForm.get('email') ? 'email' : 'sms';
  }

  checkPincode(pincode: string) {
    this.pincode = pincode;
    this.userService.checkPincode({
      pincode,
      id: this.accountVerificationResponse.id
    })
      .subscribe(() => {
        this.nextStep();
      })
  }

  resetPassword(event: SubmitEvent) {
    this.userService.resetPassword({
      id: this.accountVerificationResponse.id,
      password: event.value.password,
      pincode: this.pincode
    })
      .pipe(finalize(() => {
        this.router.navigate([Constants.Routing.LOGIN.withSlash]);
      }))
      .subscribe(() => {
        this.snackbar.open('Password reset successfully', 'Close', { duration: Number.MAX_VALUE });
      });
  }

  goToStep(index: number) {
    this.steps.fill(false);
    this.sendPincodeForm.reset();
    this.verificationForm.reset();
    this.steps[index - 1] = true;
  }

  nextStep() {
    this.goToStep(this.steps.indexOf(true) + 2);
  }

  ngOnDestroy() {
    AppUtils.unsubscribe(this.subscription);
  }

}
