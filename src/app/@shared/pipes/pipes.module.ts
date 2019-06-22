import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './safe-url/safe-url.pipe';


@NgModule({
  declarations: [SafePipe],
  exports: [SafePipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
