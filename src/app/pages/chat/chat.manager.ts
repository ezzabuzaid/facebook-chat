import * as io from 'socket.io-client';
import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';
import { Listener } from '@core/helpers/listener';
import { ChatMessage, ChatLocalMessage } from './types';
import { fromEvent } from 'rxjs';
import { TokenService } from '@core/helpers/token';

class Conversation {
    constructor(
        public id: string
    ) { }
}

@Injectable({
    providedIn: 'root'
})
export class ChatManager {
    public socket = io(environment.serverOrigin);
    public onConnect = fromEvent(this.socket, 'connect');
    public messageListener = new Listener<any>();

    constructor(
        private tokenService: TokenService
    ) { }

    sendMessage(message: ChatMessage) {
        this.socket.emit('SendMessage', message);
    }

    sendLocalMessage<T>(message: ChatLocalMessage<T>) {
        this.messageListener.notify(message);
    }

    join(id: string) {
        this.socket.emit('Join', { id });
    }
}