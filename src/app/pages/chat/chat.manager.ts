import * as io from 'socket.io-client';
import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';
import { Listener } from '@core/helpers/listener';
import { ChatMessage } from './types';
import { fromEvent } from 'rxjs';
import { TokenService } from '@core/helpers/token';

class Conversation {
    constructor(
        public recipient_id: string,
        public sender_id: string
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
    ) {
        this.onConnect
            .subscribe(() => {
                this.socket.on('Message', (message) => {
                    console.log('message => ', message);
                    this.messageListener.notify(message);
                });
                // this.chatManager.socket.on('MessageValidationError', (faildMessage: ChatMessage) => {
                //     // TODO: Mark the message `Faild to send`
                // });
            })
    }

    sendMessage(message: ChatMessage) {
        this.socket.emit('SendMessage', message);
    }

    joinConversation(recipiant_id: string) {
        const conversation = new Conversation(
            recipiant_id,
            this.tokenService.decodedToken.id
        );
        this.socket.emit('JoinRoom', conversation);
    }
}