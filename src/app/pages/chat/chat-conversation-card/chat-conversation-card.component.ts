import { Component, OnInit, ElementRef } from '@angular/core';
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
  templateUrl: './chat-conversation-card.component.html',
  styleUrls: ['./chat-conversation-card.component.scss']
})
export class ChatConversationCardComponent implements OnInit, IChatCard<UsersModel.IUser> {
  public id: string;
  public data: UsersModel.IUser = null;

  $conversation: Observable<ChatModel.IConversation> = null;

  constructor(
    private chatCardManager: ChatCardManager,
    private chatManager: ChatManager,
    private chatService: ChatService,
    private elementRef: ElementRef<HTMLElement>
  ) { }

  ngOnInit() {
    this.$conversation = this.chatService.getConversation(this.data._id).pipe(share());
    this.chatManager.joinConversation(this.data._id);
    const messagesWrapper = this.getElement('app-chat-card-messages');
    const footer = this.getElement('app-chat-card-footer');

    messagesWrapper.style.setProperty('height', `calc(100% - ${footer.clientHeight}px)`)
    // messagesWrapper.style.setProperty('transition', `max-height 0.25s`);
    // messagesWrapper.style.setProperty('max-height', `calc(100% - ${footer.clientHeight}px)`)
  }

  closeCard() {
    this.chatCardManager.removeCard();
    this.chatCardManager.removeButton(this.id);
  }


  private getElement(selector: string) {
    const element = this.elementRef.nativeElement;
    return element.querySelector(selector) as HTMLElement;
  }

  onActionBarVisibilityChange() {
    const messagesWrapper = this.getElement('app-chat-card-messages');
    const footer = this.getElement('app-chat-card-footer');
    console.log(footer.clientHeight);
    messagesWrapper.style.setProperty('height', `calc(100% - ${footer.clientHeight}px)`)
    // messagesWrapper.style.setProperty('max-height', `calc(100% - ${footer.clientHeight}px)`)
    messagesWrapper.scrollTo({
      top: messagesWrapper.scrollHeight,
      left: 0,
      behavior: 'smooth'
    })
  }

}
