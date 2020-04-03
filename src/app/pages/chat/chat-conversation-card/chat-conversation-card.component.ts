import { Component, OnInit, ElementRef } from '@angular/core';
import { ChatModel } from '@shared/models';
import { ChatCardManager } from '../chat-card.manager';
import { IChatCard } from '../index';
import { ChatManager } from '../chat.manager';

@Component({
  selector: 'app-user-card',
  templateUrl: './chat-conversation-card.component.html',
  styleUrls: ['./chat-conversation-card.component.scss']
})
export class ChatConversationCardComponent implements OnInit, IChatCard<ChatModel.IRoom> {
  public id: string;
  public data: ChatModel.IRoom = null;

  constructor(
    private chatCardManager: ChatCardManager,
    private chatManager: ChatManager,
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
