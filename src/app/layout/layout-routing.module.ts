import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Constants } from '@core/constants';
import { AppGuard } from '@core/guards';
import { ContainerComponent } from '@layout/container/container.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    canActivate: [AppGuard],
    canActivateChild: [AppGuard],
    children: [
      {
        path: Constants.Routing.MediaHub.withoutSlash,
        loadChildren: () => import('../pages/media-hub/media-hub.module').then(module => module.MediaHubModule)
      },
      {
        path: Constants.Routing.HOME.withoutSlash,
        loadChildren: () => import('../pages/home/home.module').then(({ HomeModule }) => HomeModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
