import { Component, OnInit } from '@angular/core';
import { ChatModel, UsersModel } from '@shared/models';
import { TokenService } from '@core/helpers/token';
import { ChatCardManager } from '../chat-card.manager';
import { IChatCard } from '../index';
import { ChatManager } from '../chat.manager';
import { ChatCardData } from '../types';


class Conversation {
  constructor(
    public recipient_id: string,
    public sender_id: string
  ) { }
}

@Component({
  selector: 'app-user-card',
  templateUrl: './conversation-chat-card.component.html',
  styleUrls: ['./conversation-chat-card.component.scss']
})
export class UserCardComponent implements OnInit, IChatCard<ChatCardData> {
  public id: string;
  public data: ChatCardData = null;

  conversation: ChatModel.IConversation = null;

  constructor(
    private tokenService: TokenService,
    private chatCardManager: ChatCardManager,
    private chatManager: ChatManager
  ) { }

  ngOnInit() {
    this.chatManager.socket.on('connect', () => {
      this.chatManager.socket.emit('JoinRoom', new Conversation(
        this.data.user._id,
        this.tokenService.decodedToken.id
      ));
      console.log('connected');
    });

  }

  closeCard() {
    this.chatCardManager.removeCard();
    this.chatCardManager.removeButton(this.id);
  }

}
