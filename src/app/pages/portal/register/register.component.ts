
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Constants } from '@core/constants';
import { DateField, EFieldType, Field, Form, SelectField, SelectOption, SubmitEvent } from '@ezzabuzaid/ngx-form-factory';
import { ApplicationUser } from '@core/application-user';
import { Fields } from '@shared/common';
import { PortalModel } from '@shared/models';
import { Between, ContainsLowercase, ContainsNumber, ContainsSpecialCharacter, ContainsUppercase } from '@shared/validators';
import { merge, Observable, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  host: {
    class: 'bg--primary d-block h-100'
  }
})
export class RegisterComponent implements OnInit, AfterViewInit {
  form = new Form<PortalModel.IRegister>({
    username: new Field({
      label: 'placeholder_username',
      autocomplete: 'username',
      validatorOrOpts: Validators.required
    }),
    email: Fields.Email(),
    password: Fields.Password({
      autocomplete: 'new-password',
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
    mobile: new Field({
      type: EFieldType.TEL,
      autocomplete: 'mobile',
      label: 'placeholder_mobile',
      value: '792807794',
      validatorOrOpts: Validators.required
    }),
    profile: new Form<PortalModel.IProfile>({
      firstName: new Field({
        label: 'placeholder_firstname',
        section: 'name',
        validatorOrOpts: Validators.required
      }),
      lastName: new Field({
        label: 'placeholder_lastname',
        section: 'name',
        validatorOrOpts: Validators.required
      }),
      // new RawField('nationality', {
      //   component: CountryControlComponent,
      //   section: 3,
      //   validatorOrOpts: Validators.required
      // }),
      nationality: new Field({
        label: 'Nationality',
        type: EFieldType.COUNTRY,
        section: 'General',
        validatorOrOpts: Validators.required
      }),
      placeOfBirth: new Field({
        label: 'Place of birth',
        type: EFieldType.COUNTRY,
        section: 'General',
        validatorOrOpts: Validators.required
      }),
      dateOfBrith: new DateField({
        label: 'Date of birth',
        section: 'General',
        max: new Date(),
        validatorOrOpts: Validators.required
      }),
      gender: new SelectField({
        label: 'Gender',
        section: 'General',
        options: of([new SelectOption('Male', 0), new SelectOption('Female', 1)]),
        validatorOrOpts: Validators.required
      }),
      occupation: new Field({
        label: 'Occupation',
        section: 'General'
      }),
    })
  });


  $passwordVisible: Observable<boolean> = null;
  constructor(
    private readonly router: Router,
    private readonly applicationUser: ApplicationUser,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // this.formBuilder.group()
  }

  ngAfterViewInit() {
    this.$passwordVisible = merge(
      this.form.get('password').on('focus').pipe(mapTo(true)),
      this.form.get('password').on('blur').pipe(mapTo(false))
    );
  }

  register({ valid, value }: SubmitEvent<PortalModel.IRegister>) {
    if (valid) {
      this.applicationUser.register(value)
        .subscribe(({ message }) => {
          this.snackbar.open(message, 'Close', { duration: Number.MAX_VALUE });
          this.router.navigate([Constants.Routing.LOGIN.withSlash]);
        });
    }
  }


}


