import { Component, OnInit, Input, ElementRef, QueryList, AfterViewInit, ViewChildren, OnDestroy } from '@angular/core';
import { ChatModel, ListEntityQuery } from '@shared/models';
import { ChatService } from '@shared/services/chat';
import { ChatManager } from '../chat.manager';
import { MessageBubbleComponent } from '../message-bubble/message-bubble.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppUtils } from '@core/helpers/utils';

@Component({
  selector: 'app-chat-card-messages',
  templateUrl: './chat-card-messages.component.html',
  styleUrls: ['./chat-card-messages.component.scss']
})
export class ChatCardMessagesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(MessageBubbleComponent) messageBubbleComponents: QueryList<MessageBubbleComponent>;
  @Input() id: string = null;
  public messages: ChatModel.Message[] = [];
  $provider = (pageQuery: ListEntityQuery) => this.chatService.fetchMessages(this.id, pageQuery)

  public subscription = new Subject();
  constructor(
    private chatService: ChatService,
    private chatManager: ChatManager,
    private elementRef: ElementRef<HTMLElement>,
  ) { }

  ngOnInit() {
    this.chatManager.socket
      .on('Message', message => {
        this.messages.push(message);
      });

    this.chatManager.messageListener.listen()
      .subscribe(message => {
        message.order = this.getLastMessageOrder() + 1;
        if (message.text) {
          this.chatManager.sendMessage(message);
        }
        this.messages.push(message);
      });
  }

  ngAfterViewInit() {
    this.messageBubbleComponents.changes
      .pipe(takeUntil(this.subscription))
      .subscribe(() => {
        this.messageBubbleComponents.last.element.scrollIntoView();
      })
  }

  trackBy(index: number, message: ChatModel.Message) {
    return message.timestamp;
  }

  getLastMessageOrder() {
    const message = this.messages[this.messages.length - 1];
    return message ? message.order ?? -1 : -1;
  }

  get element() {
    return this.elementRef.nativeElement;
  }

  prependMessages(messages: ChatModel.Message[]) {
    this.messages.unshift(...messages.reverse());
  }

  ngOnDestroy() {
    AppUtils.unsubscribe(this.subscription)
  }

}
