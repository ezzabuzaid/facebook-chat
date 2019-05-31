import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollDetectionComponent } from './scroll-detection.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule
  ],
  declarations: [ScrollDetectionComponent],
  exports: [ScrollDetectionComponent],
})
export class ScrollDetectionModule { }
