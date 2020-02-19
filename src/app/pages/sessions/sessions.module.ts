import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionsRoutingModule } from './sessions-routing.module';
import { SessionsComponent } from './sessions.component';
import { TableModule } from '@widget/table/table.module';
import { MaterialModule } from '@shared/common';
import { PageWrapperModule } from '@partials/page-wrapper';


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
