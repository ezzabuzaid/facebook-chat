
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@shared/user';
import { Form, Field, EFieldType, SelectField, DateField, SelectOption } from '@shared/common';
import { Constants } from '@core/constants';
import { Validators } from '@angular/forms';
import { PortalModel } from '@shared/models';
import { Observable, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { ContainsUppercase, ContainsLowercase, ContainsSpecialCharacter, ContainsNumber, Between } from '@shared/validators';
import { SubmitEvent } from '@partials/form';

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
    new Field('email', {
      type: EFieldType.EMAIL,
      autocomplete: 'email',
      label: 'placeholder_email',
      validation: { validators: [Validators.required, Validators.email] }
    }),
    new Field('password', {
      type: EFieldType.PASSWORD,
      autocomplete: 'new-password',
      label: 'placeholder_password',
      value: '',
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
      validation: { validators: [Validators.required] }
    }),
    new Form<PortalModel.IProfile>([
      new Field('firstName', {
        label: 'placeholder_firstname',
        section: 1,
        validation: {
          validators: [Validators.required]
        }
      }),
      new Field('lastName', {
        label: 'placeholder_lastname',
        section: 1,
        validation: {
          validators: [Validators.required]
        }
      }),
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
        validation: {
          validators: [Validators.required]
        }
      }),
      new DateField('dateOfBrith', {
        label: 'Date of birth',
        section: 3,
        max: new Date(),
        validation: {
          validators: [Validators.required]
        }
      }),
      new SelectField('gender', {
        label: 'Gender',
        section: 3,
        options: of([new SelectOption('Male', 0), new SelectOption('Female', 1)]),
        validation: {
          validators: [Validators.required]
        }
      }),
      new Field('occupation', {
        label: 'Occupation',
        section: 3
      }),
    ]).withName('profile')
  ]);


  $passwordVisible: Observable<boolean> = null;
  constructor(
    private router: Router,
    private userService: UserService,
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
        .subscribe(() => {
          this.router.navigate([Constants.Routing.LOGIN.withSlash]);
        });
    }
  }


}


