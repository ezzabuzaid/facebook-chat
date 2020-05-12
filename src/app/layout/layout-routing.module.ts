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
        path: Constants.Routing.Users.withoutSlash,
        loadChildren: () => import('../pages/users/users.module').then(module => module.UsersModule)
      },
      {
        path: Constants.Routing.SESSIONS.withoutSlash,
        loadChildren: () => import('../pages/sessions/sessions.module').then(module => module.SessionsModule)
      },
      {
        path: Constants.Routing.MediaHub.withoutSlash,
        loadChildren: () => import('../pages/media-hub/media-hub.module').then(module => module.MediaHubModule)
      },
      {
        path: Constants.Routing.HOME.withoutSlash,
        loadChildren: () => import('../pages/home/home.module').then(({ HomeModule }) => HomeModule)
      },
      // {
      //   path: ':moduleName',
      //   loadChildren: () => import('../pages/generic-crud/generic-crud.module').then(module => module.GenericCrudModule)
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
