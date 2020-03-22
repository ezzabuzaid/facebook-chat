import { Component, OnInit, Input } from '@angular/core';
import { AppUtils } from '@core/helpers/utils';
import { ChatModel, UsersModel } from '@shared/models';
import { ChatMessage } from '../types';
import { TokenService } from '@core/helpers/token';

import { ChatService } from '@shared/services/chat';
import { switchMap } from 'rxjs/operators';
import { ChatManager } from '../chat.manager';

@Component({
  selector: 'app-chat-card-messages',
  templateUrl: './chat-card-messages.component.html',
  styleUrls: ['./chat-card-messages.component.scss']
})
export class ChatCardMessagesComponent implements OnInit {
  @Input() user: UsersModel.IUser;
  @Input() conversation: ChatModel.IConversation;

  public messages: ChatModel.Message[] = [];

  constructor(
    private tokenService: TokenService,
    private chatService: ChatService,
    private chatManager: ChatManager
  ) { }

  ngOnInit() {
    this.chatService.getConversation(this.user._id)
      .pipe(switchMap((conversation) => {
        this.conversation = conversation;
        return this.chatService.fetchMessages(conversation._id);
      }))
      .subscribe((messages) => {
        this.messages = messages;
        // if an error happens, simply don't load the conversation
        // meanwhile try to reconnect
      });
    this.chatManager.socket.on('connect', () => {

      this.chatManager.socket.on('Message', (message) => {
        console.log('message => ', message);
        this.messages.push(message);
      });

      this.chatManager.socket.on('MessageValidationError', (faildMessage: ChatMessage) => {
        // TODO: Mark the message `Faild to send`
      });

    });
  }

  async sendMessage(input: HTMLTextAreaElement) {
    // if (AppUtils.isFalsy(this.data.conversation)) {
    //   this.conversation = await this.chatService.createConversation(this.data.user._id).toPromise();
    // }
    const text = input.value;
    if (AppUtils.isTruthy(text)) {
      const message = new ChatMessage(
        text,
        this.conversation._id,
        this.tokenService.decodedToken.id,
        this.user._id,
      );
      this.chatManager.socket.emit('SendMessage', message);
    }
    input.value = '';
  }

  isSender(id: string) {
    return this.tokenService.decodedToken.id === id;
  }

}
