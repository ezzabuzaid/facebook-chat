import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteCheckboxComponent } from './favorite-checkbox.component';
import { MaterialModule } from '@shared/common';



@NgModule({
  declarations: [FavoriteCheckboxComponent],
  exports: [FavoriteCheckboxComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class FavoriteCheckboxModule { }
