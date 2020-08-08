import { Inject, Injectable } from '@angular/core';
import { SubjectFactory } from '@core/helpers/subject-factory';
import { SOCKET_IO } from '@shared/common';
import { ChatModel } from '@shared/models';

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
