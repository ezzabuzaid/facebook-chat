import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { SessionsService } from '@shared/services/sessions';
import { SessionsModel } from '@shared/models';
import { PageEvent, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit, AfterContentInit {
  sessions: SessionsModel.ISession[] = [];
  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  constructor(
    private sessionsService: SessionsService
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
    console.log(event);
    this.fetchData(event.pageIndex, event.pageSize);
  }

}
