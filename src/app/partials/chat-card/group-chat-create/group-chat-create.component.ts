import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '@shared/services/users';
import { FormUtils } from '@partials/form';
import { Form, Field, SelectField } from '@shared/common';
import { ChatService } from '@shared/services/chat';
import { ChatModel } from '@shared/models';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-group-chat-create',
  templateUrl: './group-chat-create.component.html',
  styleUrls: ['./group-chat-create.component.scss']
})
export class GroupChatCreateComponent extends FormUtils<ChatModel.ICreateGroup> implements OnInit {
  public $users = this.usersService.getUsersWithoutMe();


  constructor(
    private usersService: UsersService,
    private chatService: ChatService,
    public dialogRef: MatDialogRef<GroupChatCreateComponent>,
  ) {
    super(
      new Form([
        new Field('title', {
          validation: {
            validators: [Validators.required]
          },
        }),
        new Field('logo', {
          validation: {
            validators: [Validators.required]
          },
        }),
        new SelectField('members', {
          validation: {
            validators: [Validators.required]
          },
        }),
      ])
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createGroup() {
    const { value, valid } = this.form;
    if (valid) {
      this.chatService.createGroup(value)
        .subscribe(() => {
          this.closeDialog();
        });
    }
  }

  ngOnInit() { }

}
