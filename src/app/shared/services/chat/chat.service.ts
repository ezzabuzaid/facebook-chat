import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatModel } from '@shared/models';
import { Constants } from '@core/constants';
import { map } from 'rxjs/operators';
import { TokenService } from '@core/helpers/token';

@Injectable({
    providedIn: 'root'
})

export class ChatService {
    constructor(
        private http: HttpClient,
        private tokenService: TokenService
    ) { }

    public createGroup(members: string[]) {
        return this.http.post(Constants.API.CHAT.groups, { members });
    }

    getConversation(participantID: string) {
        return this.http.get<ChatModel.IConversation>(`${Constants.API.CHAT.conversation}/user/${participantID}`)
        // .pipe(map((conversation) => {
        //     return this.tokenService.decodedToken.id === conversation.user1._id
        //         ? conversation.user2
        //         : conversation.user1
        // }));
    }

    createConversation(participantID: string, text: string) {
        return this.http.post<ChatModel.IConversation>(`${Constants.API.CHAT.conversation}`, {
            user1: this.tokenService.decodedToken.id,
            user2: participantID,
            message: text
        });
    }

    getConversations() {
        return this.http
            .get<ChatModel.IConversation[]>(Constants.API.CHAT.conversation)
            .pipe(map((data) => {
                return data.map(conversation => this.tokenService.decodedToken.id === conversation.user1._id
                    ? conversation.user2
                    : conversation.user1
                )
            }));
    }

    public getGroups() {
        return this.http.get<ChatModel.IGroup[]>(Constants.API.CHAT.groups);
    }

    public getGroupMembers(group_id: string) {
        return this.http.get<ChatModel.IMember[]>(`${Constants.API.CHAT.members}/${group_id}`);
    }

    fetchMessages(conversation_id: string) {
        return this.http.get<ChatModel.Message[]>(Constants.API.CHAT.messages + '/' + conversation_id);
    }

}
