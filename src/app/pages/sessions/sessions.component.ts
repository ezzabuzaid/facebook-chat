import { Component, OnInit } from '@angular/core';
import { SessionsService } from '@shared/services/sessions';

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

}
