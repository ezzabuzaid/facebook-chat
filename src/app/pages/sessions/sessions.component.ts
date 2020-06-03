import { Component, OnInit } from '@angular/core';
import { ActionColumn, DataGrid, DisplayColumn, Icon } from '@partials/datagrid/column';
import { SessionsModel } from '@shared/models';
import { SessionsService } from '@shared/services/sessions';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {
  dataGrid = new DataGrid<SessionsModel.ISession>({
    provider: (query) => this.sessionsService.getSessions(query),
    actionColumn: new ActionColumn({
      position: 'start',
      icons: [
        new Icon('block', (session) => {
          this.deactivateSession(session)
        })
      ]
    }),
    columns: [
      new DisplayColumn<SessionsModel.ISession>({
        key: 'user',
        title: 'User',
        mapper: (row) => row.user.username
      }),
      new DisplayColumn({ key: 'device_uuid', title: 'Device' }),
      new DisplayColumn({ key: 'active', title: 'Active' }),
      new DisplayColumn({ key: 'createdAt', title: 'Created At' }),
      new DisplayColumn({ key: 'updatedAt', title: 'Updated At', format: 'full' }),
    ]
  });

  constructor(
    private readonly sessionsService: SessionsService
  ) { }

  ngOnInit() { }

  deactivateSession(session: SessionsModel.ISession) {
    this.sessionsService.deactiveSession({
      session_id: session._id,
      user: session.user._id
    })
      .subscribe(() => {
        session.active = false;
        session.updatedAt = new Date().toISOString();
      });
  }

}
