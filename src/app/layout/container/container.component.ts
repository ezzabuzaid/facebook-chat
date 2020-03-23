import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersModel, ChatModel } from '@shared/models';
import { UsersService } from '@shared/services/users';
import { MatDialog } from '@angular/material/dialog';
import { ChatService } from '@shared/services/chat';
import { ChatCardManager, GroupCharCardComponent } from 'app/pages/chat';
import { ChatCreateCardComponent } from 'app/pages/chat/chat-create-card/chat-create-card.component';
import { ChatConversationCardComponent } from 'app/pages/chat/chat-conversation-card/chat-conversation-card.component';

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
    this.chatCardManager.open(ChatConversationCardComponent, {
      id: user._id,
      data: user
    });
  }

  openGroupChatCard(group: ChatModel.IGroup) {
    this.chatCardManager.open(GroupCharCardComponent, {
      data: group
    });
  }

  openCreateChatCard() {
    this.chatCardManager.open(ChatCreateCardComponent, {
      withButton: false
    });
  }

}
