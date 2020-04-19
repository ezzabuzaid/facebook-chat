import { Component, OnInit, Input, ElementRef, QueryList, AfterViewInit, ViewChildren } from '@angular/core';
import { ChatModel, ListEntityQuery } from '@shared/models';
import { ChatService } from '@shared/services/chat';
import { ChatManager } from '../chat.manager';
import { MessageBubbleComponent } from '../message-bubble/message-bubble.component';

@Component({
  selector: 'app-chat-card-messages',
  templateUrl: './chat-card-messages.component.html',
  styleUrls: ['./chat-card-messages.component.scss']
})
export class ChatCardMessagesComponent implements OnInit, AfterViewInit {
  @ViewChildren(MessageBubbleComponent) messageBubbleComponents: QueryList<MessageBubbleComponent>;
  @Input() id: string = null;
  public messages: ChatModel.Message[] = [];
  $provider = (pageQuery: ListEntityQuery) => this.chatService.fetchMessages(this.id, pageQuery)

  constructor(
    private chatService: ChatService,
    private chatManager: ChatManager,
    private elementRef: ElementRef<HTMLElement>,
  ) { }

  ngOnInit() {
    this.chatManager.socket
      .on('Message', message => {
        this.messages.push(message);
        // this.scrollToLastMessage('auto');
      });

    this.chatManager.messageListener.listen()
      .subscribe(message => {
        message.order = this.getLastMessageOrder() + 1;
        if (message.text) {
          this.chatManager.sendMessage(message);
        }
        this.messages.push(message);
        // this.scrollToLastMessage('smooth', 100);
      });
  }

  ngAfterViewInit() {
    this.messageBubbleComponents.changes
      .subscribe(() => {
        this.messageBubbleComponents.last.element.scrollIntoView();
      })
  }

  trackBy(index: number, message: ChatModel.Message) {
    return message.timestamp;
  }

  getLastMessageOrder() {
    return this.messages[this.messages.length - 1].order;
  }

  scrollToLastMessage(behavior: ScrollBehavior, afterMS = 0) {
    setTimeout(() => {
      this.element.scroll({
        behavior,
        left: 0,
        top: this.element.scrollHeight
      });
    }, afterMS);
  }

  get element() {
    return this.elementRef.nativeElement;
  }

  prependMessages(messages: ChatModel.Message[]) {
    this.messages.unshift(...messages.reverse());
  }

}
