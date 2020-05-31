import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SessionsModel } from '@shared/models';
import { SessionsService } from '@shared/services/sessions';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit, AfterContentInit {
  sessions: SessionsModel.ISession[] = [];
  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  constructor(
    private readonly sessionsService: SessionsService
  ) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.fetchData();
  }

  fetchData(page = 0, size = 10) {
    return this.sessionsService.getSessions({ page, size })
      .subscribe(data => {
        this.sessions = data.list;
        this.matPaginator.length = data.totalCount;
      });
  }

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

  onPaginate(event: PageEvent) {
    this.fetchData(event.pageIndex, event.pageSize);
  }

}
