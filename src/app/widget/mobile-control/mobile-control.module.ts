import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileControlComponent } from './mobile-control.component';
import { MaterialModule } from '@shared/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MobileControlComponent
  ],
  exports: [
    MobileControlComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class MobileControlModule { }
