import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TokenHelper } from '@core/helpers/token';
import { ChatModel } from '@shared/models';
import { IChatCard } from '..';
import { ChatCardManager } from '../chat-card.manager';
import { ChatCardComponent } from '../chat-card/chat-card.component';
import { ChatGroupMembersComponent } from '../chat-group-members/chat-group-members.component';
import { ChatManager } from '../chat.manager';

@Component({
  selector: 'app-group-chat-card',
  templateUrl: './chat-group-card.component.html',
  styleUrls: ['./chat-group-card.component.scss'],
  providers: [ChatManager]
})
export class ChatGroupCardComponent implements OnInit, OnDestroy, IChatCard<ChatModel.Room> {
  public id: string;
  public data: ChatModel.Room;
  @ViewChild(ChatCardComponent, { static: true }) baseCharCard: ChatCardComponent;

  constructor(
    private readonly tokenService: TokenHelper,
    private readonly dialog: MatDialog,
    private readonly chatCardManager: ChatCardManager,
    private readonly chatManager: ChatManager,
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
