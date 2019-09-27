import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudCreateComponent } from './crud-create/crud-create.component';
import { MaterialModule } from '@shared/common';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CrudCreateComponent
  ],
  exports: [
    CrudCreateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CrudModule { }
