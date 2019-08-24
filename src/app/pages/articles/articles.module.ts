import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { AngularEditorModule } from '@kolkov/angular-editor';

import { MaterialModule } from '@shared/common';
import { TableWidgetModule } from 'app/widget/table/table.module';
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
  ]
})
export class ArticlesModule { }
