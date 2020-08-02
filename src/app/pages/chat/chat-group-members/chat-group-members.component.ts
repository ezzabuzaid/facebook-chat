import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChatModel } from '@shared/models';
import { ChatService } from '@shared/services/chat';

@Component({
  selector: 'app-chat-members',
  templateUrl: './chat-group-members.component.html',
  styleUrls: ['./chat-group-members.component.scss']
})
export class ChatGroupMembersComponent implements OnInit {
  $members = this.chatService.getGroupMembers(this.data._id);

  constructor(
    private readonly chatService: ChatService,
    @Inject(MAT_DIALOG_DATA) private readonly data: ChatModel.Room
  ) { }

  ngOnInit() {

  }

}
