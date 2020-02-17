import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatModel } from '@shared/models';
import { Constants } from '@core/constants';

@Injectable({
    providedIn: 'root'
})

export class ChatService {
    constructor(
        private http: HttpClient,
    ) { }

    public createGroup(payload: ChatModel.IGroup) {
        return this.http.post(Constants.API.CHAT_GROUPS, payload);
    }

    public getGroups() {
        return this.http.get<ChatModel.IGroup[]>(Constants.API.CHAT_GROUPS);
    }

}
