import { Component, OnInit } from '@angular/core';
import { UsersModel } from '@shared/models';
import * as io from 'socket.io-client';
import { environment } from '@environments/environment';
import { TokenService } from '@core/helpers/token';
import { ChatCardManager } from '../chat-card.manager';
import { IChatCard } from '..';
import { AppUtils } from '@core/helpers/utils';

class Room {
  constructor(
    public sender_id: string,
    public recipient_id: string
  ) { }
}

class Message {
  constructor(
    public message: string
  ) { }
}

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit, IChatCard<UsersModel.IUser> {
  public id: string;
  public data: UsersModel.IUser;
  public socket = io(environment.serverOrigin);
  public room: Room = null;

  public messages = [];

  constructor(
    private tokenService: TokenService,
    private chatCardManager: ChatCardManager
  ) { }

  ngOnInit() {
    this.room = new Room(this.tokenService.decodedToken.id, this.data._id);


    this.socket.on('connect', () => {
      this.socket.emit('JoinRoom', this.room);
      console.log('connected');

      this.socket.on('Message', (message) => {
        console.log('message => ', message);
        this.messages.push(message);
      });
    });

  }

  sendMessage(input: HTMLTextAreaElement) {
    const text = input.value;
    if (AppUtils.isTruthy(text)) {
      const message = new Message(text);
      this.socket.emit('SendMessage', { ...this.room, ...message });
    }
    input.value = '';
  }

  closeCard() {
    this.chatCardManager.close(this.id);
  }
  showEmojiPicker = false;
  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(emoji) {

  }

}
