import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '@layout/layout/layout.component';

const FEATURES_PATH = '.././@features/';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'articles', loadChildren: `${FEATURES_PATH}articles/articles.module#ArticlesModule` },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
