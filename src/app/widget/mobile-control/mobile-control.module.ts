import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@shared/common';
import { MobileControlComponent } from './mobile-control.component';

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
