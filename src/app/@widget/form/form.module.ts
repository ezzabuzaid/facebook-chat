import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormWidgetService } from './form.service';
import { FormWidgetComponent } from './form.component';
import { MaterialModule } from '@shared/common/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    FormWidgetComponent
  ],
  exports: [
    FormWidgetComponent
  ]
})
export class FormWidgetModule { }
