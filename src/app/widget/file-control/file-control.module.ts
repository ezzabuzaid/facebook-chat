import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FileControlRoutingModule } from './file-control-routing.module';
import { FileControlComponent } from './file-control.component';


@NgModule({
  declarations: [FileControlComponent],
  exports: [FileControlComponent],
  imports: [
    CommonModule,
    FileControlRoutingModule
  ]
})
export class FileControlModule { }
