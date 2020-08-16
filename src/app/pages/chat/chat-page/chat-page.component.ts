import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { MEDIA_BREAKPOINTS } from '@shared/common';
import { ChatModel } from '@shared/models';
import { ChatService } from '@shared/services/chat';
import { RegisterdSidebar, SidebarManager } from '@widget/sidebar';
;

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {
  public $groups = this.chatService.getGroups();
  public $conversations = this.chatService.getConversations();
  public currentRoom = null;

  constructor(
    private readonly chatService: ChatService,
    private readonly sidebarService: SidebarManager,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() { }
  ngAfterViewInit() {
    if (this.breakpointObserver.isMatched(MEDIA_BREAKPOINTS.DOWN('md'))) {
      this.sidebarService.getSidebar(RegisterdSidebar.CHAT).close();
    } else {
    }
    // FIXME: mobile design should make fill the card to the whole screen so the button is not needed then
    // FIXME: a search input should be at the top for the user to search across the user lists
  }

  openChatCard(conversation: ChatModel.Room) {
    // this.chatCardManager.open(ChatConversationCardComponent, {
    //   id: conversation._id,
    //   data: conversation
    // });

    this.currentRoom = null;
    setTimeout(() => {
      this.currentRoom = conversation;
    }, null);
  }

  openGroupChatCard(room: ChatModel.Room) {
    // this.chatCardManager.open(ChatGroupCardComponent, {
    //   id: room._id,
    //   data: room
    // });
  }

  openCreateChatCard() {
    // this.chatCardManager.open(ChatCreateCardComponent, {
    //   withButton: false
    // });
  }
}
