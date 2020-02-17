import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from '@layout/container/container.component';
import { AppGuard } from '@core/guards';
import { Constants } from '@core/constants';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    canActivate: [AppGuard],
    children: [
      {
        path: Constants.Routing.SESSIONS.withoutSlash,
        loadChildren: () => import('../pages/sessions/sessions.module').then(module => module.SessionsModule)
      },
      {
        path: ':moduleName',
        loadChildren: () => import('../pages/generic-crud/generic-crud.module').then(module => module.GenericCrudModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
