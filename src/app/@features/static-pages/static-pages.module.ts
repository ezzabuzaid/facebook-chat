import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessComponent } from './success/success.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SuccessComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild()
  ]
})
export class StaticPagesModule { }
