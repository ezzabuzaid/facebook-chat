import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { TableModule } from '@widget/table/table.module';
import { PageWrapperModule } from '@partials/page-wrapper';
import { MaterialModule } from '@shared/common';


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
