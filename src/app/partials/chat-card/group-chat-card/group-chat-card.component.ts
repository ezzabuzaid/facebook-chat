import { Component, OnInit } from '@angular/core';
import { ChatModel } from '@shared/models';
import * as io from 'socket.io-client';
import { environment } from '@environments/environment';
import { TokenService } from '@core/helpers/token';
import { IChatCard } from '..';
import { MatDialog } from '@angular/material/dialog';
import { ChatMembersComponent } from '../chat-members/chat-members.component';

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

  public messages = [];

  constructor(
    private tokenService: TokenService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.room = new Room(this.tokenService.decodedToken.id, this.data._id);

    this.socket.emit('JoinRoom', this.room);

    this.socket.on('connect', () => {
      console.log('connected');

      this.socket.on('Message', (message) => {
        console.log('message => ', message);
        this.messages.push(message);
      });
    });

  }

  sendMessage(text: string) {
    const message = new Message(text);
    this.socket.emit('SendMessage', { ...this.room, ...message });
  }

  closeCard() { }

  openGroupMembers() {
    this.dialog.open(ChatMembersComponent, { data: this.data });
  }

}
