import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@shared/common';
import { CountryControlComponent } from './country-control.component';

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
