import { Component, OnInit } from '@angular/core';
import { ChatModel } from '@shared/models';
import { TokenService } from '@core/helpers/token';
import { IChatCard } from '..';
import { MatDialog } from '@angular/material/dialog';
import { ChatCardManager } from '../chat-card.manager';
import { ChatService } from '@shared/services/chat';
import { ChatGroupMembersComponent } from '../chat-group-members/chat-group-members.component';
import { ChatManager } from '../chat.manager';
import { ChatCardMessagesComponent } from '../chat-card-messages/chat-card-messages.component';

@Component({
  selector: 'app-group-chat-card',
  templateUrl: './chat-group-card.component.html',
  styleUrls: ['./chat-group-card.component.scss']
})
export class GroupCharCardComponent implements OnInit, IChatCard<ChatModel.IGroup> {
  public id: string;
  public data: ChatModel.IGroup;
  public members: ChatModel.IMember[] = [];


  constructor(
    private tokenService: TokenService,
    private dialog: MatDialog,
    private chatCardManager: ChatCardManager,
    private chatService: ChatService,
    private chatManager: ChatManager
  ) { }

  ngOnInit() {
    this.chatManager.join(this.data._id);

    this.chatService.getGroupMembers(this.data._id)
      .subscribe(members => {
        this.members = members;
      });
  }


  closeCard() {
    this.chatCardManager.removeCard();
  }

  openGroupMembers() {
    this.dialog.open(ChatGroupMembersComponent, { data: this.data });
  }

  isSender(id: string) {
    return this.tokenService.decodedToken.id === id;
  }

  getMember(id: string) {
    return this.members.find(member => member.user._id === id);
  }

  onActionBarVisibilityChange(footer: HTMLElement, messagesWrapper: ChatCardMessagesComponent) {
    const element = messagesWrapper.element;
    element.style.setProperty('height', `calc(100% - ${footer.clientHeight}px)`)
    element.scrollTo({
      top: element.scrollHeight,
      left: 0,
      behavior: 'smooth'
    })
  }

}
