import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '@core/constants';
import { ChatModel, ListEntityQuery, ListEntityResponse, PlainQuery, SessionsModel } from '@shared/models';

@Injectable({
    providedIn: 'root'
})

export class SessionsService {
    constructor(
        private readonly http: HttpClient,
    ) { }

    public deactiveSession(payload: {
        session_id: string;
        user: string;
    }) {
        return this.http.patch(`${Constants.API.SESSIONS.deactivate}`, payload);
    }

    public getSessions(query: ListEntityQuery) {
        const plainQuery = new PlainQuery<ListEntityQuery>(query);
        return this.http.get<ListEntityResponse<SessionsModel.ISession>>(`${Constants.API.SESSIONS.base}?${plainQuery.asString}`);
    }

}
