import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AppUtils } from '@core/helpers/utils';
import { ChatModel, ListEntityQuery } from '@shared/models';
import { ChatService } from '@shared/services/chat';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChatManager } from '../chat.manager';
import { MessageBubbleComponent } from '../message-bubble/message-bubble.component';

@Component({
  selector: 'app-chat-card-messages',
  templateUrl: './chat-card-messages.component.html',
  styleUrls: ['./chat-card-messages.component.scss']
})
export class ChatCardMessagesComponent implements OnInit, AfterViewInit, OnDestroy {

  get element() {
    return this.elementRef.nativeElement;
  }
  @ViewChildren(MessageBubbleComponent) messageBubbleComponents: QueryList<MessageBubbleComponent>;
  @Input() id: string = null;
  public messages: ChatModel.Message[] = [];

  public subscription = new Subject();
  constructor(
    private readonly chatService: ChatService,
    private readonly chatManager: ChatManager,
    private readonly elementRef: ElementRef<HTMLElement>,
  ) { }
  $provider = (pageQuery: ListEntityQuery) => this.chatService.fetchMessages(this.id, pageQuery)

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

  prependMessages(messages: ChatModel.Message[]) {
    this.messages.unshift(...messages.reverse());
  }

  ngOnDestroy() {
    AppUtils.unsubscribe(this.subscription)
  }

}
