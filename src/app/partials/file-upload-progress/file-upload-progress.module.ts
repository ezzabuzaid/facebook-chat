import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadProgressComponent } from './file-upload-progress.component';
import { PipesModule } from '@shared/pipes';

@NgModule({
  declarations: [FileUploadProgressComponent],
  imports: [
    CommonModule,
    PipesModule
  ],
  exports: [FileUploadProgressComponent]
})
export class FileUploadProgressModule { }
