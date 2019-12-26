import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { IField, EFieldType } from '@shared/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-factory',
  templateUrl: './form-factory.component.html',
  styleUrls: ['./form-factory.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormFactoryComponent),
    multi: true
  }]
})
// TODO: rename it to field factory
export class FormFactoryComponent implements OnInit {
  @Input() field: IField<any>;
  types = EFieldType;

  constructor() { }

  ngOnInit() {
  }

}
