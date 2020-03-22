import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersModel, ChatModel } from '@shared/models';
import { UsersService } from '@shared/services/users';
import { MatDialog } from '@angular/material/dialog';
import { ChatService } from '@shared/services/chat';
import { ChatCardManager, GroupCharCardComponent, GroupChatCreateComponent } from 'app/pages/chat';
import { UserCardComponent } from 'app/pages/chat/conversation-chat-card/conversation-chat-card.component';
import { ChatCreateCardComponent } from 'app/pages/chat/chat-create-card/chat-create-card.component';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  public $users = this.usersService.getUsersWithoutMe();
  public $groups = this.chatService.getGroups();
  public $conversations = this.chatService.getConversations();

  constructor(
    private usersService: UsersService,
    private chatCardManager: ChatCardManager,
    private chatService: ChatService,
    private dialog: MatDialog
  ) { }

  ngOnInit() { }

  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData.state;
  }

  getState(outlet) {
    return outlet && outlet.activatedRouteData.state;
  }

  openChatCard(user: UsersModel.IUser) {
    this.chatCardManager.open(UserCardComponent, {
      id: user._id,
      data: user
    });
  }

  openGroupChatCard(group: ChatModel.IGroup) {
    this.chatCardManager.open(GroupCharCardComponent, {
      data: group
    });
  }

  openCreateGroup() {
    const dialogRef = this.dialog.open(GroupChatCreateComponent, {
      width: '750px'
    });
    dialogRef.disableClose = true;
  }

  openCreateChatCard() {
    this.chatCardManager.open(ChatCreateCardComponent, {
      withButton: false
    });
  }

}
