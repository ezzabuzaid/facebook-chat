import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormModule } from '@partials/form';
import { MaterialModule } from '@shared/common';
import { DirectivesModule } from '@shared/directives';
import { TableModule } from '@widget/table/table.module';
import { UploadFileModule } from '@widget/upload-file';
import { CrudManagerComponent } from './crud-manager/crud-manager.component';
import { GenericCrudRoutingModule } from './generic-crud-routing.module';
import { GenericReadComponent } from './generic-read/generic-read.component';
import { GenericWriteComponent } from './generic-write/generic-write.component';


@NgModule({
  declarations: [
    GenericWriteComponent,
    CrudManagerComponent,
    GenericReadComponent
  ],
  imports: [
    CommonModule,
    GenericCrudRoutingModule,
    TableModule,
    FormModule,
    MaterialModule,
    // Ng2SmartTableModule,
    UploadFileModule,
    DirectivesModule
  ]
})
export class GenericCrudModule { }
