import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@shared/common';
import { ProgressBarComponent } from './progress-bar.component';


@NgModule({
  declarations: [ProgressBarComponent],
  exports: [ProgressBarComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ProgressBarModule { }
