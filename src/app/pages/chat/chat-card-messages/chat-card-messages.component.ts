import { Component, OnInit, Input } from '@angular/core';
import { ChatModel, UsersModel } from '@shared/models';
import { TokenService } from '@core/helpers/token';

import { ChatService } from '@shared/services/chat';
import { ChatManager } from '../chat.manager';

@Component({
  selector: 'app-chat-card-messages',
  templateUrl: './chat-card-messages.component.html',
  styleUrls: ['./chat-card-messages.component.scss']
})
export class ChatCardMessagesComponent implements OnInit {
  private _conversation = null;

  @Input() user: UsersModel.IUser;
  @Input()
  set conversation(value: ChatModel.IConversation) {
    this._conversation = value;
    if (value) {
      this.populateMessages();
    }
  }
  get conversation() {
    return this._conversation;
  }

  public messages: ChatModel.Message[] = [];

  constructor(
    private tokenService: TokenService,
    private chatService: ChatService,
    private chatManager: ChatManager,
  ) { }

  ngOnInit() {
    this.chatManager.messageListener
      .listen()
      .subscribe(message => {
        this.messages.push(message);
      })
  }

  populateMessages() {
    this.chatService.fetchMessages(this.conversation._id)
      .subscribe((messages) => {
        this.messages = messages;
        // if an error happens, simply don't load the conversation
        // meanwhile try to reconnect
      });

  }

  isSender(id: string) {
    return this.tokenService.decodedToken.id === id;
  }

}
