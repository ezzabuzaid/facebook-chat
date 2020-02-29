import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersModel, ChatModel } from '@shared/models';
import { UsersService } from '@shared/services/users';
import { ChatCardManager, GroupChatCreateComponent, UserCardComponent, GroupCharCardComponent } from '@partials/chat-card';
import { MatDialog } from '@angular/material/dialog';
import { ChatService } from '@shared/services/chat';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  public $users = this.usersService.getUsersWithoutMe();
  public $groups = this.chatService.getGroups();

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
    this.chatCardManager.open(UserCardComponent, user);
  }

  openGroupChatCard(group: ChatModel.IGroup) {
    this.chatCardManager.open(GroupCharCardComponent, group);
  }

  openCreateGroup() {
    const dialogRef = this.dialog.open(GroupChatCreateComponent, {
      width: '750px'
    });
    dialogRef.disableClose = true;
  }

}
