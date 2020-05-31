import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudManagerComponent } from './crud-manager/crud-manager.component';


const routes: Routes = [
  { path: ':operation', component: CrudManagerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenericCrudRoutingModule { }
