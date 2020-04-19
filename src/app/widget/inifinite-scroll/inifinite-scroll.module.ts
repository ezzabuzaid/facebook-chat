import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InifiniteScrollingComponent } from './inifinite-scroll.component';
import { ScrollDetectionModule } from '@widget/scroll-detection';

@NgModule({
  declarations: [InifiniteScrollingComponent],
  exports: [InifiniteScrollingComponent],
  imports: [
    CommonModule,
    ScrollDetectionModule
  ]
})
export class InifiniteScrollingModule { }
