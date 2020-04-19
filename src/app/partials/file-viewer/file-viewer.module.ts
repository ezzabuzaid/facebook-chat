import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileViewerComponent } from './file-viewer.component';

@NgModule({
  declarations: [FileViewerComponent],
  imports: [
    CommonModule
  ],
  exports: [FileViewerComponent]
})
export class FileViewerModule { }
