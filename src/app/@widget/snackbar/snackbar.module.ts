import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarViewComponent } from './snackbar.component';
import { MaterialModule } from '@shared/common';
import { SnackbarService } from './snackbar.service';

@NgModule({
  declarations: [
    SnackbarViewComponent
  ],
  entryComponents: [
    SnackbarViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [
    SnackbarService
  ]
})
export class SnackbarModule { }
