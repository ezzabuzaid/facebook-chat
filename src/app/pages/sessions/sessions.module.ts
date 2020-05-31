import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PageWrapperModule } from '@partials/page-wrapper';
import { MaterialModule } from '@shared/common';
import { TableModule } from '@widget/table/table.module';
import { SessionsRoutingModule } from './sessions-routing.module';
import { SessionsComponent } from './sessions.component';


@NgModule({
  declarations: [SessionsComponent],
  imports: [
    CommonModule,
    TableModule,
    PageWrapperModule,
    MaterialModule,
    SessionsRoutingModule
  ]
})
export class SessionsModule { }
