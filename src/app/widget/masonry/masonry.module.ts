import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasonryComponent } from './masonry.component';
import { MasonryItemComponent } from './masonry-item/masonry-item.component';



@NgModule({
  declarations: [MasonryComponent, MasonryItemComponent],
  exports: [MasonryComponent, MasonryItemComponent],
  imports: [
    CommonModule
  ]
})
export class MasonryModule { }
