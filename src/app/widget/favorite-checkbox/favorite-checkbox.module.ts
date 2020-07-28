import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@shared/common';
import { FavoriteCheckboxComponent } from './favorite-checkbox.component';



@NgModule({
  declarations: [FavoriteCheckboxComponent],
  exports: [FavoriteCheckboxComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class FavoriteCheckboxModule { }
