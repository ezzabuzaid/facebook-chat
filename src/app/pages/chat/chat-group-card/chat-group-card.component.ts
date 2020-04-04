import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { ChatModel } from '@shared/models';
import { TokenService } from '@core/helpers/token';
import { IChatCard } from '..';
import { MatDialog } from '@angular/material/dialog';
import { ChatCardManager } from '../chat-card.manager';
import { ChatService } from '@shared/services/chat';
import { ChatGroupMembersComponent } from '../chat-group-members/chat-group-members.component';
import { ChatManager } from '../chat.manager';

@Component({
  selector: 'app-group-chat-card',
  templateUrl: './chat-group-card.component.html',
  styleUrls: ['./chat-group-card.component.scss']
})
export class ChatGroupCardComponent implements OnInit, OnDestroy, IChatCard<ChatModel.IGroup> {
  public id: string;
  public data: ChatModel.IGroup;

  constructor(
    private tokenService: TokenService,
    private dialog: MatDialog,
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

  openGroupMembers() {
    this.dialog.open(ChatGroupMembersComponent, { data: this.data });
  }

  isSender(id: string) {
    return this.tokenService.decodedToken.id === id;
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

  ngOnDestroy() {
    this.chatManager.leave(this.data._id);
  }
}
