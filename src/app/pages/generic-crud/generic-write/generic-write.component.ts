import { Component, OnInit, Input } from '@angular/core';
import { GenericCrudModel } from '../generic-crud.model';
import { HttpClient } from '@angular/common/http';
import { Module } from '@shared/models/generic-module';

@Component({
  selector: 'app-generic-write',
  templateUrl: './generic-write.component.html',
  styleUrls: ['./generic-write.component.scss']
})
export class GenericWriteComponent implements OnInit {
  @Input() endpoint = '';
  @Input() module = null;

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    if (GenericCrudModel.EOperations.UPDATE) {
      this.module.form.patchValue({});
    }
  }

  onSubmit() {
    const { value, valid } = this.module.form;
    // TODO: preValidation
    if (valid) {
      // TODO: preSubmittion
      this.http.post(this.module.url || this.endpoint, value)
        .subscribe((res) => {
          console.log(res);
          // TODO: postSubmittion
        });
    }
  }

}
