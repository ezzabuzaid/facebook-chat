import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersModel } from '@shared/models';
import { UsersService } from '@shared/services/users';
import { ChatCardManager, GroupChatCreateComponent } from '@partials/chat-card';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  public $users = this.usersService.getUsersWithoutMe();

  constructor(
    private usersService: UsersService,
    private chatCardManager: ChatCardManager,
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
    this.chatCardManager.open(user);
  }

  openGroupChatCard(user: UsersModel.IUser) {
    this.chatCardManager.open(user);
  }

  openCreateGroup() {
    this.dialog.open(GroupChatCreateComponent);
  }

}
