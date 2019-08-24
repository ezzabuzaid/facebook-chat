import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from '@layout/container/container.component';
import { AppGuard } from '@core/guards';

const FEATURES_PATH = '.././@features/';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    canActivate: [AppGuard],
    children: [
      { path: 'articles', loadChildren: () => import('../pages/articles/articles.module').then(e => e.ArticlesModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
