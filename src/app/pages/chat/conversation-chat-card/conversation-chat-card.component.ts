import { Component, OnInit } from '@angular/core';
import { ChatModel, UsersModel } from '@shared/models';
import * as io from 'socket.io-client';
import { environment } from '@environments/environment';
import { TokenService } from '@core/helpers/token';
import { ChatCardManager } from '../chat-card.manager';
import { IChatCard } from '../index';
import { AppUtils } from '@core/helpers/utils';
import { ChatService } from '@shared/services/chat';
import { switchMap } from 'rxjs/operators';

export class ChatCardData {
  conversation: boolean;
  user: UsersModel.IUser;
}

class Message {
  constructor(
    public text: string,
    public conversation: string,
    public sender_id: string,
    public recipient_id: string
  ) { }
}

class Conversation {
  constructor(
    public recipient_id: string,
    public sender_id: string
  ) { }
}

@Component({
  selector: 'app-user-card',
  templateUrl: './conversation-chat-card.component.html',
  styleUrls: ['./conversation-chat-card.component.scss']
})
export class UserCardComponent implements OnInit, IChatCard<ChatCardData> {
  public id: string;
  public data: ChatCardData = null;
  public socket = io(environment.serverOrigin);
  public messages: ChatModel.Message[] = [];

  conversation: ChatModel.IConversation = null;

  constructor(
    private tokenService: TokenService,
    private chatService: ChatService,
    private chatCardManager: ChatCardManager
  ) { }

  ngOnInit() {
    if (this.data.conversation) {
      this.chatService.getConversation(this.data.user._id)
        .pipe(switchMap((conversation) => {
          this.conversation = conversation;
          return this.chatService.fetchMessages(conversation._id);
        }))
        .subscribe((messages) => {
          this.messages = messages;
          // if an error happens, simply don't load the conversation
          // meanwhile try to reconnect
        });
      this.socket.on('connect', () => {
        this.socket.emit('JoinRoom', new Conversation(
          this.data.user._id,
          this.tokenService.decodedToken.id
        ));
        console.log('connected');

        this.socket.on('Message', (message) => {
          console.log('message => ', message);
          this.messages.push(message);
        });

        this.socket.on('MessageValidationError', (faildMessage: Message) => {
          // TODO: Mark the message `Faild to send`
        });

      });
    }

  }

  async sendMessage(input: HTMLTextAreaElement) {
    if (AppUtils.isFalsy(this.data.conversation)) {
      this.conversation = await this.chatService.createConversation(this.data.user._id).toPromise();
    }
    console.log(this.conversation);
    const text = input.value;
    if (AppUtils.isTruthy(text)) {
      const message = new Message(
        text,
        this.conversation._id,
        this.tokenService.decodedToken.id,
        this.data.user._id,
      );
      this.socket.emit('SendMessage', message);
    }
    input.value = '';
  }

  closeCard() {
    this.chatCardManager.removeCard();
    this.chatCardManager.removeButton(this.id);
  }

  showEmojiPicker = false;
  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(emoji) {

  }

  isSender(id: string) {
    return this.tokenService.decodedToken.id === id;
  }

}
