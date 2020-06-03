import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatagridModule } from '@partials/datagrid';
import { PageWrapperModule } from '@partials/page-wrapper';
import { MaterialModule } from '@shared/common';
import { SessionsRoutingModule } from './sessions-routing.module';
import { SessionsComponent } from './sessions.component';



@NgModule({
  declarations: [SessionsComponent],
  imports: [
    CommonModule,
    PageWrapperModule,
    DatagridModule,
    MaterialModule,
    SessionsRoutingModule,
  ]
})
export class SessionsModule { }
