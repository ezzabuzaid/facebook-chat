import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PincodeBoxComponent } from './pincode-box.component';
import { MaterialModule } from '@shared/common';
import { FormModule } from '@partials/form';

@NgModule({
  declarations: [PincodeBoxComponent],
  exports: [PincodeBoxComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormModule
  ]
})
export class PincodeBoxModule { }

