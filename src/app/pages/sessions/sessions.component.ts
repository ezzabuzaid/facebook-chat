import { Component, OnInit } from '@angular/core';
import { SessionsService } from '@shared/services/sessions';
import { SessionsModel } from '@shared/models';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {
  $sessions = this.sessionsService.getSessions();

  constructor(
    private sessionsService: SessionsService
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
