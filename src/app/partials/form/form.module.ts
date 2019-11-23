import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFactoryComponent } from './form-factory/form-factory.component';
import { FormContainerComponent } from './form-container/form-container.component';
import { MaterialModule } from '@shared/common';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FormFactoryComponent,
    FormContainerComponent
  ],
  exports: [
    FormFactoryComponent,
    FormContainerComponent,
    ReactiveFormsModule
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
})
export class FormModule { }
