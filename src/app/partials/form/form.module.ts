import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@shared/common';
import { DirectivesModule } from '@shared/directives';
import { CountryControlModule } from '@widget/country-control';
import { MobileControlModule } from '@widget/mobile-control';
import { FormContainerComponent } from './form-container/form-container.component';
import { FieldFactoryComponent } from './form-factory/form-factory.component';


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
    CountryControlModule,
    DirectivesModule,
    TranslateModule.forChild()
  ],
})
export class FormModule { }
