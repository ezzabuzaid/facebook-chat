import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatModel } from '@shared/models';
import { UsersService } from '@shared/services/users';
import { ChatService } from '@shared/services/chat';
import { ChatCardManager, ChatGroupCardComponent } from 'app/pages/chat';
import { ChatCreateCardComponent } from 'app/pages/chat/chat-create-card/chat-create-card.component';
import { ChatConversationCardComponent } from 'app/pages/chat/chat-conversation-card/chat-conversation-card.component';
import { ChatFloatingButtonComponent } from 'app/pages/chat/chat-floating-button/chat-floating-button.component';

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
  ) { }

  ngOnInit() {
    this.chatCardManager.setButtonComponent(ChatFloatingButtonComponent);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData.state;
  }

  getState(outlet) {
    return outlet && outlet.activatedRouteData.state;
  }

  openChatCard(conversation: ChatModel.IRoom) {
    this.chatCardManager.open(ChatConversationCardComponent, {
      id: conversation._id,
      data: conversation
    });
  }

  openGroupChatCard(group: ChatModel.IRoom) {
    this.chatCardManager.open(ChatGroupCardComponent, {
      id: group._id,
      data: group
    });
  }

  openCreateChatCard() {
    this.chatCardManager.open(ChatCreateCardComponent, {
      withButton: false
    });
  }

}
