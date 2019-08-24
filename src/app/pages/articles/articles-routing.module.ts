import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleCreateComponent } from './articles-create/articles-create.component';
import { ArticleUpdateComponent } from './articles-update/articles-update.component';
import { ArticlesResolve } from './articles-update/article-resolver.service';

// NOTE Implement resolver when load article update component

const routes: Routes = [
  { path: '', component: ArticlesListComponent },
  { path: 'update/:id', component: ArticleUpdateComponent, resolve: { data: ArticlesResolve } },
  { path: 'create', component: ArticleCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ArticlesResolve]
})
export class ArticlesRoutingModule { }
