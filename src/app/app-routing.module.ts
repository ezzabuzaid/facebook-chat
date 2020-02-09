import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Constants } from '@core/constants';
import { PageNotFoundComponent } from './pages/static/page-not-found/page-not-found.component';

const routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: Constants.Routing.HOME.withSlash,
  },
  {
    path: Constants.Routing.Portal.withoutSlash,
    loadChildren: () => import('./pages/portal/portal.module').then(e => e.PortalModule)
  },
  { path: Constants.Routing.NOT_FOUND.withoutSlash, component: PageNotFoundComponent },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
