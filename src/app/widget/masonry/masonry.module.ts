import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MasonryItemComponent } from './masonry-item/masonry-item.component';
import { MasonryComponent } from './masonry.component';



@NgModule({
  declarations: [MasonryComponent, MasonryItemComponent],
  exports: [MasonryComponent, MasonryItemComponent],
  imports: [
    CommonModule
  ]
})
export class MasonryModule { }
