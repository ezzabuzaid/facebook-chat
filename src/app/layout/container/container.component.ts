import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChatModel } from '@shared/models';
import { ChatService } from '@shared/services/chat';
import { ChatCardManager, ChatGroupCardComponent, ChatConversationCardComponent } from 'app/pages/chat';
import { SidebarManager, RegisterdSidebar } from '@widget/sidebar';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MEDIA_BREAKPOINTS } from '@shared/common';
import { ChatFloatingButtonComponent } from 'app/pages/chat/chat-floating-button/chat-floating-button.component';
import { ChatCreateCardComponent } from 'app/pages/chat/chat-create-card/chat-create-card.component';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit, AfterViewInit {
  public $groups = this.chatService.getGroups();
  public $conversations = this.chatService.getConversations();

  constructor(
    private readonly chatCardManager: ChatCardManager,
    private readonly chatService: ChatService,
    private readonly sidebarService: SidebarManager,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    if (this.breakpointObserver.isMatched(MEDIA_BREAKPOINTS.DOWN('md'))) {
      this.sidebarService.getSidebar(RegisterdSidebar.CHAT).close();
    } else {
    }
    // FIXME: mobile design should make fill the card to the whole screen so the button is not needed then
    // FIXME: a search input should be at the top for the user to search across the user lists
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
