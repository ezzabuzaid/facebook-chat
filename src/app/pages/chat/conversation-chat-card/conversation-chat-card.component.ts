import { Component, OnInit } from '@angular/core';
import { ChatModel, UsersModel } from '@shared/models';
import { TokenService } from '@core/helpers/token';
import { ChatCardManager } from '../chat-card.manager';
import { IChatCard } from '../index';
import { ChatManager } from '../chat.manager';
import { ChatService } from '@shared/services/chat';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';



@Component({
  selector: 'app-user-card',
  templateUrl: './conversation-chat-card.component.html',
  styleUrls: ['./conversation-chat-card.component.scss']
})
export class UserCardComponent implements OnInit, IChatCard<UsersModel.IUser> {
  public id: string;
  public data: UsersModel.IUser = null;

  $conversation: Observable<ChatModel.IConversation> = null;

  constructor(
    private chatCardManager: ChatCardManager,
    private chatManager: ChatManager,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.$conversation = this.chatService.getConversation(this.data._id).pipe(share());
    this.chatManager.joinConversation(this.data._id, () => { });
  }

  closeCard() {
    this.chatCardManager.removeCard();
    this.chatCardManager.removeButton(this.id);
  }

}
