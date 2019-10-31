import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { EFieldType, Form } from '@shared/common';

@Component({
  selector: 'app-crud-create',
  templateUrl: './crud-create.component.html',
  styleUrls: ['./crud-create.component.scss']
})
export class CrudCreateComponent implements OnInit {
  @Input() form: Form = null;
  types = EFieldType;

  @Output() submit = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  create() {
    this.submit.emit();
  }

}
