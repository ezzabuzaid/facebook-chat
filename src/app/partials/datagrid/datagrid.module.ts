import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/common';
import { DatagridComponent } from './datagrid.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [DatagridComponent],
  exports: [DatagridComponent],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule.forChild()
  ]
})
export class DatagridModule { }
