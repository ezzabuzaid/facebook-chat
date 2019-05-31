import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@shared/common';
import { UploadPictureComponent } from './upload-picture.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    MaterialModule
  ],
  declarations: [UploadPictureComponent],
  exports: [UploadPictureComponent]
})
export class UploadPictureModule { }
