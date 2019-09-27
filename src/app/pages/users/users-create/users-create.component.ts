import { Component, OnInit } from '@angular/core';
import { Field, EFieldType, SelectField, Form } from '@shared/common';
import { FormGroup, Validators } from '@angular/forms';
import { CrudUtils } from '@widget/form';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.scss']
})
export class UsersCreateComponent implements OnInit {
  fields: Field[] | SelectField<any>[] = [
    new Field('fname', {
      validation: {},
      value: null,
      type: EFieldType.TEXT,
      label: 'First Name',
      section: 'name'
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
    new SelectField<string[]>('MultipleSelect', {
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
    })
  ];
  Form = new Form(this.fields);

  constructor() { }

  ngOnInit() { }


}
