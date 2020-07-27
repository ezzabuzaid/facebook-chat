import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Constants } from '@core/constants';
import { AppUtils } from '@core/helpers/utils';
import { EFieldType, Field, Form, SubmitEvent } from '@ezzabuzaid/ngx-form-factory';
import { UserService } from '@shared/account';
import { Fields, _extract } from '@shared/common';
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
  verificationForm = new Form<PortalModel.IForgotPassword>({
    username: new Field({
      label: _extract('placeholder_username'),
      autocomplete: 'username',
      validatorOrOpts: Validators.required
    }),
    firstName: new Field({
      label: _extract('placeholder_firstname'),
      autocomplete: 'given-name',
      validatorOrOpts: Validators.required
    }),
    lastName: new Field({
      label: _extract('placeholder_lastname'),
      autocomplete: 'family-name',
      validatorOrOpts: Validators.required
    }),
    placeOfBirth: new Field({
      label: _extract('placeholder_place_of_birth'),
      autocomplete: 'country-name',
      type: EFieldType.COUNTRY,
      validatorOrOpts: Validators.required
    }),
  });

  sendPincodeForm = new Form<{ email: string, mobile: string }>({
    email: Fields.Email(),
    mobile: new Field({
      type: EFieldType.TEL,
      autocomplete: 'mobile',
    })
  });

  resetPasswordForm = new Form<{ password: string, confirmPassword: string }>({
    password: Fields.Password({
      autocomplete: 'off',
      hint: 'at least 8 charachter',
      validatorOrOpts: [
        Validators.required,
        Between(8, 16),
        ContainsUppercase(),
        ContainsLowercase(),
        ContainsSpecialCharacter(),
        ContainsNumber()
      ]
    }),
    confirmPassword: Fields.Password({
      label: 'placeholder_confirm_password',
      autocomplete: 'off',
      validatorOrOpts: [
        Validators.required,
        EqualTo('password')
      ]
    })
  }, {
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
    this.sendPincodeForm.patchValue({ email: 'admin@admin.com' });
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
      });
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
      });
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
