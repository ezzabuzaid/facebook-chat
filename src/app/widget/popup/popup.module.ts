import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { PromptComponent } from './prompt/prompt.component';
import { MaterialModule } from '@shared/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AlertComponent,
    ConfirmComponent,
    PromptComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    TranslateModule.forChild()
  ],
  entryComponents: [
    AlertComponent,
    ConfirmComponent,
    PromptComponent,
  ]
})
export class PopupModule { }

