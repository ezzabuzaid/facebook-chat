import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PageWrapperModule } from '@partials/page-wrapper';
import { MaterialModule } from '@shared/common';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersRoutingModule } from './users-routing.module';
import { DatagridModule } from '@partials/datagrid';


@NgModule({
  declarations: [UsersListComponent],
  imports: [
    CommonModule,
    DatagridModule,
    PageWrapperModule,
    MaterialModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
