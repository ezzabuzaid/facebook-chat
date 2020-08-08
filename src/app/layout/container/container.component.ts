import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ChatModel } from '@shared/models';
import { ChatService } from '@shared/services/chat';
import { UsersService } from '@shared/services/users';
import { ChatCardManager, ChatGroupCardComponent } from 'app/pages/chat';
import { ChatConversationCardComponent } from 'app/pages/chat/chat-conversation-card/chat-conversation-card.component';
import { ChatCreateCardComponent } from 'app/pages/chat/chat-create-card/chat-create-card.component';
import { ChatFloatingButtonComponent } from 'app/pages/chat/chat-floating-button/chat-floating-button.component';

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
  public $groups = this.chatService.getGroups();
  public $conversations = this.chatService.getConversations();
  constructor(
    private readonly chatCardManager: ChatCardManager,
    private readonly chatService: ChatService,
  ) { }

  ngOnInit() {
    this.chatCardManager.setButtonComponent(ChatFloatingButtonComponent);
  }

  openChatCard(conversation: ChatModel.Room) {
    this.chatCardManager.open(ChatConversationCardComponent, {
      id: conversation._id,
      data: conversation
    });
  }

  openGroupChatCard(room: ChatModel.Room) {
    this.chatCardManager.open(ChatGroupCardComponent, {
      id: room._id,
      data: room
    });
  }

  openCreateChatCard() {
    this.chatCardManager.open(ChatCreateCardComponent, {
      withButton: false
    });
  }

}
