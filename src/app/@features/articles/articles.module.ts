import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { AngularEditorModule } from '@kolkov/angular-editor';

import { MaterialModule } from '@shared/common';
import { TableWidgetModule } from '@widget/table/table.module';
import { FormWidgetModule } from '@widget/form';
import { UploadPictureModule } from '@widget/upload-picture';
import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleService } from './article.service';
import { ArticleCreateComponent } from './articles-create/articles-create.component';
import { ArticleUpdateComponent } from './articles-update/articles-update.component';
import { ArticlesController } from './articles.controller';
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
    TableWidgetModule,
    FormWidgetModule,
    UploadPictureModule,
    TranslateModule.forChild(),
    AngularEditorModule,
    ArticlesRoutingModule,
    PipesModule
  ],
  providers: [
    ArticleService,
    ArticlesController
  ]
})
export class ArticlesModule { }
