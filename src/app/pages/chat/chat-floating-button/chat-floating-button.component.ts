import { Component, HostListener, OnInit } from '@angular/core';
import { ChatModel } from '@shared/models';
import { ChatCardManager } from '../chat-card.manager';
import { IChatCard } from '../index';

@Component({
  selector: 'app-chat-floating-button',
  templateUrl: './chat-floating-button.component.html',
  styleUrls: ['./chat-floating-button.component.scss']
})
export class ChatFloatingButtonComponent implements OnInit, IChatCard<ChatModel.Room>{
  data: ChatModel.Room;
  id: string;

  constructor(
    private readonly chatCardManager: ChatCardManager
  ) { }

  ngOnInit() { }

  @HostListener('click') floatingButton() {
    this.chatCardManager.toogleCard(this.chatCardManager.getComponent(this.id), this.data, this.id);
  }

}
