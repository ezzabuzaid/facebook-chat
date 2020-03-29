import { Component, OnInit, HostListener } from '@angular/core';
import { ChatCardManager } from '../chat-card.manager';
import { IChatCard } from '../index';
import { ChatModel } from '@shared/models';
import { ChatConversationCardComponent } from '../chat-conversation-card/chat-conversation-card.component';

@Component({
  selector: 'app-chat-floating-button',
  templateUrl: './chat-floating-button.component.html',
  styleUrls: ['./chat-floating-button.component.scss']
})
export class ChatFloatingButtonComponent implements OnInit, IChatCard<ChatModel.IRoom>{

  data: ChatModel.IRoom;
  id: string;

  constructor(
    private chatCardManager: ChatCardManager
  ) { }

  ngOnInit(): void {
  }

  @HostListener('click') floatingButton() {
    this.chatCardManager.toogleCard(ChatConversationCardComponent, this.data, this.id);
  }

}
