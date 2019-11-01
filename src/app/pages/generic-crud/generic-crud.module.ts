import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenericCrudRoutingModule } from './generic-crud-routing.module';
import { GenericWriteComponent } from './generic-write/generic-write.component';
import { CrudManagerComponent } from './crud-manager/crud-manager.component';
import { SemiTableModule } from '@widget/table/table.module';
import { MaterialModule } from '@shared/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CrudModule } from 'app/partial/crud/crud.module';
import { GenericReadComponent } from './generic-read/generic-read.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [
    GenericWriteComponent,
    CrudManagerComponent,
    GenericReadComponent
  ],
  entryComponents: [
    GenericReadComponent
  ],
  imports: [
    CommonModule,
    GenericCrudRoutingModule,
    SemiTableModule,
    CrudModule,
    MaterialModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
  ]
})
export class GenericCrudModule { }
