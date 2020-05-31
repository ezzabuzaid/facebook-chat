import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ScrollDetectionComponent } from './scroll-detection.component';

@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule
  ],
  declarations: [ScrollDetectionComponent],
  exports: [ScrollDetectionComponent],
})
export class ScrollDetectionModule { }
