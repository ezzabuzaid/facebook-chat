import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '@layout/layout/layout.component';


const FEATURES_PATH = '.././@features/';

const routes: Routes = [
  {
    path: '', component: LayoutComponent
    // , children: [
    //   { path: 'dashboard', loadChildren: `${FEATURES_PATH}dashboard/dashboard.module#DashboardModule`, data: { state: 'module' } },
    //   { path: 'order', loadChildren: `${FEATURES_PATH}order/order.module#OrderModule`, data: { state: 'module' } },
    //   { path: 'addresses', loadChildren: `${FEATURES_PATH}addresses/addresses.module#AddressesModule`, data: { state: 'module' } },
    //   { path: 'support', loadChildren: `${FEATURES_PATH}support/support.module#SupportModule`, data: { state: 'module' } },
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
