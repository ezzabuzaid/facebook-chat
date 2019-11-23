import { Component, OnInit, Input } from '@angular/core';
import { IField, EFieldType } from '@shared/common';

@Component({
  selector: 'app-form-factory',
  templateUrl: './form-factory.component.html',
  styleUrls: ['./form-factory.component.scss']
})
export class FormFactoryComponent implements OnInit {
  @Input() field: IField<any>;
  types = EFieldType;

  constructor() { }

  ngOnInit() {
  }

}
