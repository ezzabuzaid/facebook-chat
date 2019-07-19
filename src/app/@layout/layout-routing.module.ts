import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '@layout/layout/layout.component';
import { AppGuard } from '@core/guards';

const FEATURES_PATH = '.././@features/';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AppGuard],
    children: [
      { path: 'articles', loadChildren: `${FEATURES_PATH}articles/articles.module#ArticlesModule` },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
