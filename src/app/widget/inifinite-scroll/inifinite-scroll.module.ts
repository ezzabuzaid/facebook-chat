import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ScrollDetectionModule } from '@widget/scroll-detection';
import { InifiniteScrollingComponent } from './inifinite-scroll.component';

@NgModule({
  declarations: [InifiniteScrollingComponent],
  exports: [InifiniteScrollingComponent],
  imports: [
    CommonModule,
    ScrollDetectionModule
  ]
})
export class InifiniteScrollingModule { }
