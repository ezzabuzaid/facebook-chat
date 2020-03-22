import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppUtils } from '@core/helpers/utils';
import { TokenService } from '@core/helpers/token';
import { ChatManager } from '../chat.manager';
import { ChatMessage } from '../types';
import { ChatModel, UsersModel } from '@shared/models';

@Component({
  selector: 'app-chat-card-footer',
  templateUrl: './chat-card-footer.component.html',
  styleUrls: ['./chat-card-footer.component.scss']
})
export class ChatCardFooterComponent implements OnInit {
  @Input() conversation: ChatModel.IConversation;
  @Input() user: UsersModel.IUser;
  @Input() external = false;
  @Output() onSendMessage = new EventEmitter();

  constructor(
    private tokenService: TokenService,
    private chatManager: ChatManager
  ) { }

  ngOnInit(): void {
  }

  sendMessage(input: HTMLTextAreaElement) {
    const text = input.value;
    if (AppUtils.isTruthy(text)) {
      input.value = '';
      if (this.external) {
        this.onSendMessage.emit(text);
      } else {
        const message = new ChatMessage(
          text,
          this.conversation._id,
          this.tokenService.decodedToken.id,
          this.user._id,
        );
        this.chatManager.sendMessage(message);
      }
    }

  }

}
