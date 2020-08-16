import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Constants } from '@core/constants';
import { AppGuard } from '@core/guards';
import { PageNotFoundComponent } from './pages/static/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: Constants.Routing.CHAT.withSlash,
  },
  {
    path: Constants.Routing.Portal.withoutSlash,
    loadChildren: () => import('./pages/portal/portal.module').then(({ PortalModule }) => PortalModule)
  },
  {
    canLoad: [AppGuard],
    path: Constants.Routing.CHAT.withoutSlash,
    loadChildren: () => import('./pages/chat/chat.module').then(({ ChatModule }) => ChatModule)
  },
  {
    canLoad: [AppGuard],
    path: Constants.Routing.CHAT.withoutSlash,
    loadChildren: () => import('./pages/media-hub/media-hub.module').then(({ MediaHubModule }) => MediaHubModule)
  },
  {
    path: Constants.Routing.NOT_FOUND.withoutSlash,
    component: PageNotFoundComponent
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabled',
      paramsInheritanceStrategy: 'always',
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
