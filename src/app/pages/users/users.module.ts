import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { SemiTableModule } from '@widget/table/table.module';
import { MaterialModule } from '@shared/common';
import { UsersCreateComponent } from './users-create/users-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CrudModule } from 'app/partial/crud/crud.module';

@NgModule({
  declarations: [
    UsersListComponent,
    UsersCreateComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SemiTableModule,
    MaterialModule,
    ReactiveFormsModule,
    CrudModule
  ]
})
export class UsersModule { }
