import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ChatModel } from '@shared/models';
import { TokenService } from '@core/helpers/token';

import { ChatService } from '@shared/services/chat';
import { ChatManager } from '../chat.manager';
import { environment } from '@environments/environment';
import { MediaHubManager } from 'app/pages/media-hub/media-hub.manager';
import { AppUtils } from '@core/helpers/utils';

@Component({
  selector: 'app-chat-card-messages',
  templateUrl: './chat-card-messages.component.html',
  styleUrls: ['./chat-card-messages.component.scss']
})
export class ChatCardMessagesComponent implements OnInit {
  @Input() id: string = null;
  public messages: ChatModel.Message[] = [];

  constructor(
    private tokenService: TokenService,
    private chatService: ChatService,
    private chatManager: ChatManager,
    private elementRef: ElementRef<HTMLElement>,
    private mediaHubManager: MediaHubManager
  ) { }

  ngOnInit() {
    this.populateMessages();

    this.chatManager.socket
      .on('Message', message => {
        this.messages.push(message);
        this.scrollToLastMessage('auto');
      });
  }

  populateMessages() {
    this.chatService.fetchMessages(this.id)
      .subscribe((messages) => {
        this.messages = messages;
        this.scrollToLastMessage('smooth');
      });
  }

  scrollToLastMessage(behavior: ScrollBehavior) {
    setTimeout(() => {
      const children = this.elementRef.nativeElement.children;
      const lastElement = children.item(children.length - 1);
      lastElement && lastElement.scrollIntoView({ behavior })
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
    return AppUtils.isImage(value);
  }

  populateFileURL(value: string) {
    return environment.serverOrigin + value;
  }

  get element() {
    return this.elementRef.nativeElement;
  }

  openLightbox(message: ChatModel.Message) {
    this.mediaHubManager.openLightbox({
      file: {
        fullPath: this.populateFileURL(message.text),
        name: message.text
      } as any
    });
  }

}
