import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryControlComponent } from './country-control.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@shared/common';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CountryControlComponent
  ],
  exports: [
    CountryControlComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    TranslateModule.forChild()
  ]
})
export class CountryControlModule { }
