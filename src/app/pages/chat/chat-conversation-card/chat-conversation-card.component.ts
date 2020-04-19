import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ChatModel } from '@shared/models';
import { ChatCardManager } from '../chat-card.manager';
import { IChatCard } from '../index';
import { ChatManager } from '../chat.manager';
import { ChatCardComponent } from '../chat-card/chat-card.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './chat-conversation-card.component.html',
  styleUrls: ['./chat-conversation-card.component.scss']
})
export class ChatConversationCardComponent implements OnInit, OnDestroy, IChatCard<ChatModel.IRoom> {
  public id: string;
  public data: ChatModel.IRoom = null;
  @ViewChild(ChatCardComponent, { static: true }) baseCharCard: ChatCardComponent;

  constructor(
    private chatCardManager: ChatCardManager,
    private chatManager: ChatManager,
  ) { }

  ngOnInit() {
    this.chatManager.join(this.data._id);
    this.baseCharCard.updateContentHeight();
  }

  updateScroll() {
    this.baseCharCard.updateContentHeight();
  }

  closeCard() {
    this.chatCardManager.removeCard();
    this.chatCardManager.removeButton(this.id);
  }

  ngOnDestroy() {
    this.chatManager.leave(this.data._id);
  }

}
