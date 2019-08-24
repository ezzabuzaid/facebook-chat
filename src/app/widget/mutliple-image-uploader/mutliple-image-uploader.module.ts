import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultipleImageUploaderComponent } from './image-wrapper/image-wrapper.component';

@NgModule({
  declarations: [MultipleImageUploaderComponent],
  exports: [MultipleImageUploaderComponent],
  imports: [
    CommonModule
  ]
})
export class MutlipleImageUploaderModule { }
