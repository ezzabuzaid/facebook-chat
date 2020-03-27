import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ChatModel, UsersModel } from '@shared/models';
import { TokenService } from '@core/helpers/token';

import { ChatService } from '@shared/services/chat';
import { ChatManager } from '../chat.manager';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-chat-card-messages',
  templateUrl: './chat-card-messages.component.html',
  styleUrls: ['./chat-card-messages.component.scss']
})
export class ChatCardMessagesComponent implements OnInit {
  private _conversation = null;

  @Input() user: UsersModel.IUser;
  @Input()
  set conversation(value: ChatModel.IConversation) {
    this._conversation = value;
    if (value) {
      this.populateMessages();
    }
  }
  get conversation() {
    return this._conversation;
  }

  public messages: ChatModel.Message[] = [];

  constructor(
    private tokenService: TokenService,
    private chatService: ChatService,
    private chatManager: ChatManager,
    private elementRef: ElementRef<HTMLElement>
  ) { }

  ngOnInit() {
    this.chatManager.messageListener
      .listen()
      .subscribe(message => {
        this.messages.push(message);
        this.scrollToLastMessage('auto');
      });
  }

  populateMessages() {
    this.chatService.fetchMessages(this.conversation._id)
      .subscribe((messages) => {
        this.messages = messages;
        this.scrollToLastMessage('smooth');
      });
  }

  scrollToLastMessage(behavior: ScrollBehavior) {
    setTimeout(() => {
      const children = this.elementRef.nativeElement.children;
      const lastElement = children.item(children.length - 1);
      lastElement && lastElement.scrollIntoView({
        behavior
      })
    });
  }

  isSender(id: string) {
    return this.tokenService.decodedToken.id === id;
  }

  isUrl(value: any) {
    try {
      new URL(value);
      return true;
    } catch (error) {
      return false;
    }
  }

  isImage(value: string) {
    return /(\.jpg|\.png|\.bmp|\.gif)$/i.test(value);
  }

  populateImageURL(value: string) {
    return environment.serverOrigin + value;
  }

}
