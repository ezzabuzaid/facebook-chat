import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from '@layout/container/container.component';
import { AppGuard } from '@core/guards';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    // canActivate: [AppGuard],
    children: [
      { path: 'users', loadChildren: () => import('../pages/users/users.module').then(e => e.UsersModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
