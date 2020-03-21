import { Component, OnInit, HostListener } from '@angular/core';
import { ChatCardManager } from '../chat-card.manager';
import { UserCardComponent } from '../user-card/user-card.component';
import { IChatCard, ChatCardData } from '../index';

@Component({
  selector: 'app-chat-floating-button',
  templateUrl: './chat-floating-button.component.html',
  styleUrls: ['./chat-floating-button.component.scss']
})
export class ChatFloatingButtonComponent implements OnInit, IChatCard<ChatCardData>{

  data: ChatCardData;
  id: string;

  constructor(
    private chatCardManager: ChatCardManager
  ) { }

  ngOnInit(): void {
  }

  @HostListener('click') floatingButton() {
    // this.chatCardManager.toogleCard(this.id);
    // if (this.chatCardManager.currentCardID === this.id) {
    //   this.chatCardManager.closeCurrentCard();
    // } else {
    //   this.chatCardManager.closeCurrentCard();
    //   this.chatCardManager.open(UserCardComponent, this.data);
    // }
    this.chatCardManager.toogleCard(UserCardComponent, this.data, this.id);
  }

}
