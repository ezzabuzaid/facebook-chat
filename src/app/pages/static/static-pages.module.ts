import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SuccessComponent } from './success/success.component';

@NgModule({
  declarations: [
    SuccessComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild()
  ]
})
export class StaticPagesModule { }
