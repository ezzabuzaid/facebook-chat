import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PageWrapperModule } from '@partials/page-wrapper';
import { MaterialModule } from '@shared/common';
import { TableModule } from '@widget/table/table.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersRoutingModule } from './users-routing.module';


@NgModule({
  declarations: [UsersListComponent],
  imports: [
    CommonModule,
    TableModule,
    PageWrapperModule,
    MaterialModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
