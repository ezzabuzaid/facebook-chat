import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldFactoryComponent } from './form-factory/form-factory.component';
import { FormContainerComponent } from './form-container/form-container.component';
import { MaterialModule } from '@shared/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MobileControlModule } from '@widget/mobile-control';
import { CountryControlModule } from '@widget/country-control';


@NgModule({
  declarations: [
    FieldFactoryComponent,
    FormContainerComponent
  ],
  exports: [
    FieldFactoryComponent,
    FormContainerComponent,
    ReactiveFormsModule
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MobileControlModule,
    CountryControlModule
  ],
})
export class FormModule { }
