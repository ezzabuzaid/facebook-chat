import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessComponent } from './success/success.component';
import { TranslateModule } from '@ngx-translate/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

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
