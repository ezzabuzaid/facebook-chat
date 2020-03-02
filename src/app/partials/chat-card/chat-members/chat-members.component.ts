import { Component, OnInit, Inject } from '@angular/core';
import { ChatService } from '@shared/services/chat';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChatModel } from '@shared/models';

@Component({
  selector: 'app-chat-members',
  templateUrl: './chat-members.component.html',
  styleUrls: ['./chat-members.component.scss']
})
export class ChatMembersComponent implements OnInit {
  $members = this.chatService.getGroupMembers(this.data._id);

  constructor(
    private chatService: ChatService,
    @Inject(MAT_DIALOG_DATA) private data: ChatModel.IGroup
  ) { }

  ngOnInit() {

  }

}
