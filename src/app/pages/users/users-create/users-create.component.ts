import { Component, OnInit } from '@angular/core';
import { Field, EFieldType, SelectField, Form } from '@shared/common';
import { FormGroup, Validators } from '@angular/forms';
import { CrudUtils } from '@widget/form';

interface TestFields {
  fname: string;
  lname: string;
  MultipleSelect: string[];
  mobile: string;
  role: string;
  RadioSelect: string;
}

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.scss']
})
export class UsersCreateComponent implements OnInit {
  fields: (Field<keyof TestFields> | SelectField<keyof TestFields>)[] = [
    new Field('fname', {
      validation: {},
      value: null,
      type: EFieldType.TEXT,
      label: 'First Name',
      section: 'name',
    }),
    new Field('lname', {
      validation: {},
      value: null,
      type: EFieldType.TEXT,
      label: 'Last Name',
      section: 'name'
    }),
    new Field('mobile', {
      validation: {},
      value: null,
      type: EFieldType.TEXT,
      label: 'Name'
    }),
    new SelectField('role', {
      validation: {
        validators: [Validators.required]
      },
      value: 'option',
      type: EFieldType.SELECT,
      label: 'Roles',
      options: [{ label: 'Option 1', value: 'option' }]
    }),
    new SelectField<keyof TestFields>('MultipleSelect', {
      validation: {
        validators: [Validators.required]
      },
      value: ['admin', 'user'],
      type: EFieldType.MULTIPLE,
      label: 'Multiple Select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' }
      ]
    }),
    new SelectField<keyof TestFields>('RadioSelect', {
      validation: {
        validators: [Validators.required]
      },
      value: 'admin',
      type: EFieldType.RADIO,
      label: 'Radio Select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' }
      ]
    })
  ];

  public Form = new Form<TestFields>(this.fields);

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.Form.value);
  }


}
