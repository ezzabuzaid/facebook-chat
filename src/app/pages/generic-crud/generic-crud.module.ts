import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenericCrudRoutingModule } from './generic-crud-routing.module';
import { GenericWriteComponent } from './generic-write/generic-write.component';
import { CrudManagerComponent } from './crud-manager/crud-manager.component';
import { TableModule } from '@widget/table/table.module';
import { MaterialModule } from '@shared/common';
import { GenericReadComponent } from './generic-read/generic-read.component';
import { FormModule } from '@partials/form';
import { UploadFileModule } from '@widget/upload-file';
import { DirectivesModule } from '@shared/directives';


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
    TableModule,
    FormModule,
    MaterialModule,
    // Ng2SmartTableModule,
    UploadFileModule,
    DirectivesModule
  ]
})
export class GenericCrudModule { }
