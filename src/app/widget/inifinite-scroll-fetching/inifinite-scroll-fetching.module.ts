import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InifiniteScrollFetchingComponent } from './inifinite-scroll-fetching.component';
import { ScrollDetectionModule } from '@widget/scroll-detection';

@NgModule({
  declarations: [InifiniteScrollFetchingComponent],
  exports: [InifiniteScrollFetchingComponent],
  imports: [
    CommonModule,
    ScrollDetectionModule
  ]
})
export class InifiniteScrollFetchingModule { }
