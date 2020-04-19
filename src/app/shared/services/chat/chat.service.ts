import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatModel, ListEntityResponse, PlainQuery, ListEntityQuery } from '@shared/models';
import { Constants } from '@core/constants';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ChatService {
    constructor(
        private http: HttpClient,
    ) { }

    public createRoom(message: string, name: string, members: string[]) {
        return this.http.post<ChatModel.IRoom>(Constants.API.CHAT.rooms, { message, name, members });
    }

    public getGroup(users: string[]) {
        const query = users.reduce((acc, user) => acc += `members[]=${user}&`, '');
        return this.http.get<ChatModel.IGroup>(`${Constants.API.CHAT.members}?${query}`);
    }

    public getGroups() {
        return this.http.get<ListEntityResponse<ChatModel.IRoom>>(Constants.API.CHAT.groups)
            .pipe(map(({ list }) => list));
    }

    public getConversations() {
        return this.http.get<ListEntityResponse<ChatModel.IRoom>>(Constants.API.CHAT.conversation)
            .pipe(map(({ list }) => list));
    }

    public getGroupMembers(group_id: string) {
        return this.http.get<ListEntityResponse<ChatModel.IMember>>(`${Constants.API.CHAT.members}/${group_id}`)
            .pipe(map(({ list }) => list))
    }

    public fetchMessages(room: string, query: ListEntityQuery) {
        const plainQuery = new PlainQuery(query);
        return this.http.get<ListEntityResponse<ChatModel.Message>>(`${Constants.API.CHAT.rooms}/${room}/messages?${plainQuery.asString}`)
    }

}
