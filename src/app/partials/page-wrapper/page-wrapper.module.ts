import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageWrapperComponent } from './page-wrapper.component';


@NgModule({
  declarations: [PageWrapperComponent],
  exports: [PageWrapperComponent],
  imports: [
    CommonModule,
  ]
})
export class PageWrapperModule { }
