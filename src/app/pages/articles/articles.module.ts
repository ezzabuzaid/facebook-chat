import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@shared/common';
import { FormWidgetModule } from 'app/widget/form';
import { UploadPictureModule } from 'app/widget/upload-picture';
import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleService } from './article.service';
import { ArticleCreateComponent } from './articles-create/articles-create.component';
import { ArticleUpdateComponent } from './articles-update/articles-update.component';
import { PipesModule } from '@shared/pipes/pipes.module';

@NgModule({
  declarations: [
    ArticlesListComponent,
    ArticleCreateComponent,
    ArticleUpdateComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormWidgetModule,
    UploadPictureModule,
    TranslateModule.forChild(),
    ArticlesRoutingModule,
    PipesModule
  ],
  providers: [
    ArticleService,
  ]
})
export class ArticlesModule { }
