import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FileViewerComponent } from './file-viewer.component';

@NgModule({
  declarations: [FileViewerComponent],
  imports: [
    CommonModule
  ],
  exports: [FileViewerComponent]
})
export class FileViewerModule { }
