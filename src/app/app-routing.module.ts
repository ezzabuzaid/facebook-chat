import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const FEATURES_PATH = './@features/';

const routes: Routes = [
  { path: 'portal', loadChildren: `${FEATURES_PATH}portal/portal.module#PortalModule` }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
