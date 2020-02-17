import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatModel, SessionsModel } from '@shared/models';
import { Constants } from '@core/constants';

@Injectable({
    providedIn: 'root'
})

export class SessionsService {
    constructor(
        private http: HttpClient,
    ) { }

    public deactiveSession(payload: SessionsModel.ISession) {
        return this.http.post(Constants.API.SESSIONS, payload);
    }

    public getSessions() {
        return this.http.get<SessionsModel.ISession[]>(Constants.API.SESSIONS);
    }

}
