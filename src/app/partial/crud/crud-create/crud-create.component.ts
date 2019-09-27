import { Component, OnInit, Input } from '@angular/core';
import { EFieldType, SelectField, Field, Form } from '@shared/common';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-crud-create',
  templateUrl: './crud-create.component.html',
  styleUrls: ['./crud-create.component.scss']
})
export class CrudCreateComponent implements OnInit {
  @Input() form: Form = null;
  types = EFieldType;

  constructor() { }

  ngOnInit() { }

  create() { }

}
