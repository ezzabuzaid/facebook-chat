
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Constants } from '@core/constants';
import { DateField, EFieldType, Field, Form, RawField, SelectField, SelectOption, SubmitEvent } from '@partials/form';
import { UserService } from '@shared/account';
import { PortalModel } from '@shared/models';
import { Between, ContainsLowercase, ContainsNumber, ContainsSpecialCharacter, ContainsUppercase } from '@shared/validators';
import { CountryControlComponent } from '@widget/country-control';
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
  form = new Form<PortalModel.IRegister>([
    new Field('username', {
      label: 'placeholder_username',
      autocomplete: 'username',
      validation: { validators: [Validators.required] }
    }),
    Field.Email('email'),
    Field.Password('password', {
      autocomplete: 'new-password',
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
    new Field('mobile', {
      type: EFieldType.TEL,
      autocomplete: 'mobile',
      label: 'placeholder_mobile',
      value: 792807794,
      validation: Validators.required
    }),
    new Form<PortalModel.IProfile>([
      new Field('firstName', {
        label: 'placeholder_firstname',
        section: 1,
        validation: Validators.required
      }),
      new Field('lastName', {
        label: 'placeholder_lastname',
        section: 1,
        validation: Validators.required
      }),
      // new RawField('nationality', {
      //   component: CountryControlComponent,
      //   section: 3,
      //   validation: Validators.required
      // }),
      new Field('nationality', {
        label: 'Nationality',
        type: EFieldType.COUNTRY,
        section: 3,
        validation: {
          validators: [Validators.required]
        }
      }),
      new Field('placeOfBirth', {
        label: 'Place of birth',
        type: EFieldType.COUNTRY,
        section: 3,
        validation: Validators.required
      }),
      new DateField('dateOfBrith', {
        label: 'Date of birth',
        section: 3,
        max: new Date(),
        validation: Validators.required
      }),
      new SelectField('gender', {
        label: 'Gender',
        section: 3,
        options: of([new SelectOption('Male', 0), new SelectOption('Female', 1)]),
        validation: Validators.required
      }),
      new Field('occupation', {
        label: 'Occupation',
        section: 3
      }),
    ]).withName('profile')
  ]);


  $passwordVisible: Observable<boolean> = null;
  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.$passwordVisible = merge(
      this.form.get('password').on('focus').pipe(mapTo(true)),
      this.form.get('password').on('blur').pipe(mapTo(false))
    );
  }

  register({ valid, value }: SubmitEvent<PortalModel.IRegister>) {
    if (valid) {
      this.userService.register(value)
        .subscribe(({ message }) => {
          this.snackbar.open(message, 'Close', { duration: Number.MAX_VALUE });
          this.router.navigate([Constants.Routing.LOGIN.withSlash]);
        });
    }
  }


}


