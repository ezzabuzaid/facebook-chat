import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ChatModel } from '@shared/models';
import { TokenHelper } from '@core/helpers/token';
import { IChatCard } from '..';
import { MatDialog } from '@angular/material/dialog';
import { ChatCardManager } from '../chat-card.manager';
import { ChatGroupMembersComponent } from '../chat-group-members/chat-group-members.component';
import { ChatManager } from '../chat.manager';
import { ChatCardComponent } from '../chat-card/chat-card.component';

@Component({
  selector: 'app-group-chat-card',
  templateUrl: './chat-group-card.component.html',
  styleUrls: ['./chat-group-card.component.scss']
})
export class ChatGroupCardComponent implements OnInit, OnDestroy, IChatCard<ChatModel.IGroup> {
  public id: string;
  public data: ChatModel.IGroup;
  @ViewChild(ChatCardComponent, { static: true }) baseCharCard: ChatCardComponent;

  constructor(
    private tokenService: TokenHelper,
    private dialog: MatDialog,
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

  openGroupMembers() {
    this.dialog.open(ChatGroupMembersComponent, { data: this.data });
  }

  isSender(id: string) {
    return this.tokenService.decodedToken.id === id;
  }

  ngOnDestroy() {
    this.chatManager.leave(this.data._id);
  }
}
