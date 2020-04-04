import { Component, OnInit, HostListener } from '@angular/core';
import { ChatCardManager } from '../chat-card.manager';
import { IChatCard } from '../index';
import { ChatModel } from '@shared/models';

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

  ngOnInit() {
    this.chatCardManager.setButtonComponent(ChatFloatingButtonComponent);
  }

  @HostListener('click') floatingButton() {
    this.chatCardManager.toogleCard(this.chatCardManager.getComponent(this.id), this.data, this.id);
  }

}
