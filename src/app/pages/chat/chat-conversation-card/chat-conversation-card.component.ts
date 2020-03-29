import { Component, OnInit, ElementRef } from '@angular/core';
import { ChatModel } from '@shared/models';
import { ChatCardManager } from '../chat-card.manager';
import { IChatCard } from '../index';
import { ChatManager } from '../chat.manager';
import { ChatService } from '@shared/services/chat';
import { ChatCardMessagesComponent } from '../chat-card-messages/chat-card-messages.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './chat-conversation-card.component.html',
  styleUrls: ['./chat-conversation-card.component.scss']
})
export class ChatConversationCardComponent implements OnInit, IChatCard<ChatModel.IConversation> {
  public id: string;
  public data: ChatModel.IConversation = null;

  constructor(
    private chatCardManager: ChatCardManager,
    private chatManager: ChatManager,
    private chatService: ChatService,
    private elementRef: ElementRef<HTMLElement>
  ) { }

  ngOnInit() {
    this.chatManager.join(this.data._id);
    this.updateScroll(this.getElement('app-chat-card-footer'), this.getElement('app-chat-card-messages'));
  }

  closeCard() {
    this.chatCardManager.removeCard();
    this.chatCardManager.removeButton(this.id);
  }


  private getElement(selector: string) {
    const element = this.elementRef.nativeElement;
    return element.querySelector(selector) as HTMLElement;
  }

  updateScroll(footer: HTMLElement, messagesWrapper: HTMLElement) {
    messagesWrapper.style.setProperty('height', `calc(100% - ${footer.clientHeight}px)`)
    messagesWrapper.scrollTo({
      top: messagesWrapper.scrollHeight,
      left: 0,
      behavior: 'smooth'
    })
  }

}
