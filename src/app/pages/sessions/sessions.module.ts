import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionsRoutingModule } from './sessions-routing.module';
import { SessionsComponent } from './sessions.component';
import { TableModule } from '@widget/table/table.module';
import { MaterialModule } from '@shared/common';


@NgModule({
  declarations: [SessionsComponent],
  imports: [
    CommonModule,
    TableModule,
    MaterialModule,
    SessionsRoutingModule
  ]
})
export class SessionsModule { }
