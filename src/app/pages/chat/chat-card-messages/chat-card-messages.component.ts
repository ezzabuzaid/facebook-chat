import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ChatModel } from '@shared/models';
import { ChatService } from '@shared/services/chat';
import { ChatManager } from '../chat.manager';

@Component({
  selector: 'app-chat-card-messages',
  templateUrl: './chat-card-messages.component.html',
  styleUrls: ['./chat-card-messages.component.scss']
})
export class ChatCardMessagesComponent implements OnInit {
  @Input() id: string = null;
  public messages: ChatModel.Message[] = [];

  constructor(
    private chatService: ChatService,
    private chatManager: ChatManager,
    private elementRef: ElementRef<HTMLElement>,
  ) { }

  ngOnInit() {
    this.populateMessages();

    this.chatManager.socket
      .on('Message', message => {
        this.messages.push(message);
        this.scrollToLastMessage('auto');
      });

    this.chatManager.messageListener.listen()
      .subscribe(message => {
        message.order = this.getLastMessageOrder() + 1;
        console.log('order', message.order);
        if (message.text) {
          this.chatManager.sendMessage(message);
        }
        this.messages.push(message);
        this.scrollToLastMessage('smooth', 100);
      });
  }

  trackBy(index: number, message: ChatModel.Message) {
    return message.timestamp;
  }


  populateMessages() {
    this.chatService.fetchMessages(this.id)
      .subscribe((messages) => {
        this.messages = messages;
        this.scrollToLastMessage('smooth', 500);
      });
  }

  getLastMessageOrder() {
    return this.messages[this.messages.length - 1].order;
  }

  scrollToLastMessage(behavior: ScrollBehavior, afterMS = 0) {
    setTimeout(() => {
      const children = this.element.children;
      const lastElement = children.item(children.length - 1);
      lastElement && lastElement.scrollIntoView({ behavior })
    }, afterMS);
  }

  get element() {
    return this.elementRef.nativeElement;
  }


}
