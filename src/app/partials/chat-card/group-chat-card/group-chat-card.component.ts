import { Component, OnInit } from '@angular/core';
import { ChatModel } from '@shared/models';
import * as io from 'socket.io-client';
import { environment } from '@environments/environment';
import { TokenService } from '@core/helpers/token';
import { IChatCard } from '..';
import { MatDialog } from '@angular/material/dialog';
import { ChatMembersComponent } from '../chat-members/chat-members.component';
import { ChatCardManager } from '../chat-card.manager';
import { AppUtils } from '@core/helpers/utils';
import { ChatService } from '@shared/services/chat';

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
  selector: 'app-group-chat-card',
  templateUrl: './group-chat-card.component.html',
  styleUrls: ['./group-chat-card.component.scss']
})
export class GroupCharCardComponent implements OnInit, IChatCard<ChatModel.IGroup> {
  public id: string;
  public data: ChatModel.IGroup;
  public socket = io(environment.serverOrigin);
  public room: Room = null;
  public members: ChatModel.IMember[] = [];

  public messages: (Message & Room)[] = [];

  constructor(
    private tokenService: TokenService,
    private dialog: MatDialog,
    private chatCardManager: ChatCardManager,
    private chatService: ChatService,
  ) { }

  ngOnInit() {
    this.chatService.getGroupMembers(this.data._id)
      .subscribe(members => {
        this.members = members;
      });

    this.room = new Room(this.tokenService.decodedToken.id, this.data._id);

    this.socket.emit('JoinGroup', this.room);

    this.socket.on('connect', () => {
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
      this.messages.push({ ...this.room, ...message });
      this.socket.emit('SendGroupMessage', { ...this.room, ...message });
      console.log(this.room.sender_id);
    }
    input.value = '';
  }

  closeCard() {
    this.chatCardManager.close(this.id);
  }

  openGroupMembers() {
    this.dialog.open(ChatMembersComponent, { data: this.data });
  }

  isSender(id: string) {
    return this.tokenService.decodedToken.id === id;
  }

  getMember(id: string) {
    return this.members.find(member => member.user._id === id);
  }

  trackMessagesBySenderID(index: number, message: (Room & Message)) {
    return message.sender_id;
  }

}
