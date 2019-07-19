import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormWidgetService } from './form.service';
import { FormWidgetComponent } from './form.component';
import { MaterialModule } from '@shared/common/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    FormWidgetComponent
  ],
  exports: [
    FormWidgetComponent,
    ReactiveFormsModule
  ]
})
export class FormWidgetModule { }
