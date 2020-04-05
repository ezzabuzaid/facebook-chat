import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatModel } from '@shared/models';
import { UsersService } from '@shared/services/users';
import { ChatService } from '@shared/services/chat';
import { ChatCardManager, ChatGroupCardComponent } from 'app/pages/chat';
import { ChatCreateCardComponent } from 'app/pages/chat/chat-create-card/chat-create-card.component';
import { ChatConversationCardComponent } from 'app/pages/chat/chat-conversation-card/chat-conversation-card.component';
import { ChatFloatingButtonComponent } from 'app/pages/chat/chat-floating-button/chat-floating-button.component';
import { trigger, transition, style, query, animateChild, animate, group } from '@angular/animations';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ], { optional: true }),
        query(':enter', [
          style({ transform: 'translateX(-100%)' })
        ], { optional: true }),
        query(':leave', animateChild(), { optional: true }),
        group([
          query(':leave', [
            animate('200ms ease-in-out', style({ transform: 'translateX(100%)' }))
          ], { optional: true }),
          query(':enter', [
            animate('300ms ease-in-out', style({ transform: 'translateX(0)' }))
          ], { optional: true })
        ]),
        query(':enter', animateChild()),
      ])
    ])
  ]
})
export class ContainerComponent implements OnInit {
  public $users = this.usersService.getUsersWithoutMe();
  public $groups = this.chatService.getGroups();
  public $conversations = this.chatService.getConversations();
  @ViewChild(RouterOutlet, { static: true }) private outlet: RouterOutlet;
  constructor(
    private usersService: UsersService,
    private chatCardManager: ChatCardManager,
    private chatService: ChatService,
  ) { }

  ngOnInit() {
    this.outlet.activateEvents.subscribe(component => {

    });
    this.chatCardManager.setButtonComponent(ChatFloatingButtonComponent);
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
