import { inject, Inject, Injectable, InjectionToken } from '@angular/core';
import { SubjectFactory } from '@core/helpers/subject-factory';
import { TokenHelper } from '@core/helpers/token';
import { environment } from '@environments/environment';
import { ChatModel } from '@shared/models';
import * as io from 'socket.io-client';

export const SOCKET_IO = new InjectionToken('SOCKET_IO', {
    providedIn: 'root', factory: () => {
        const tokenHelper = inject(TokenHelper);
        return io(environment.serverOrigin, {
            query: { token: tokenHelper.token },
            transports: ['websocket']
        });
    }
});
@Injectable()
export class ChatManager {

    public messageListener = new SubjectFactory<ChatModel.Message>();

    constructor(
        @Inject(SOCKET_IO) public readonly socket: SocketIOClient.Socket
    ) { }

    sendMessage(message: ChatModel.Message) {
        this.socket.emit('SendMessage', new ChatModel.ChatOutgoingMessage(
            message.room,
            message.text,
            message.order,
            message.timestamp
        ));
    }

    makeCallNegotiation(callNegotiation: ChatModel.CallNegotiation) {
        this.socket.emit('MakeCallNegotiation', callNegotiation);
    }

    acceptCallNegotiation(callNegotiation: ChatModel.CallNegotiation) {
        this.socket.emit('AcceptCallNegotiation', callNegotiation);
    }

    sendLocalMessage(message: ChatModel.Message) {
        this.messageListener.notify(message);
    }

    join(id: string) {
        this.socket.emit('Join', { id });
    }

    leave(id: string) {
        this.socket.emit('Leave', { id });
    }
}
