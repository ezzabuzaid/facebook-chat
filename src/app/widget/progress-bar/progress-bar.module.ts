import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from './progress-bar.component';
import { MaterialModule } from '@shared/common';


@NgModule({
  declarations: [ProgressBarComponent],
  exports: [ProgressBarComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ProgressBarModule { }
