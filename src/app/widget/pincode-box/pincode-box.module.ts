import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormModule } from '@partials/form';
import { MaterialModule } from '@shared/common';
import { PincodeBoxComponent } from './pincode-box.component';

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

