import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@shared/common';
import { PipesModule } from '@shared/pipes/pipes.module';
import { UploadFileComponent } from './upload-file.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    MaterialModule,
    PipesModule
  ],
  declarations: [UploadFileComponent],
  exports: [UploadFileComponent]
})
export class UploadFileModule { }
