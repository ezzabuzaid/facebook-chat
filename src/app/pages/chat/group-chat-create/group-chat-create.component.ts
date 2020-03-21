import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '@shared/services/users';
import { FormUtils } from '@partials/form';
import { Form, Field, SelectField } from '@shared/common';
import { ChatService } from '@shared/services/chat';
import { ChatModel, UsersModel } from '@shared/models';
import { Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { AppUtils } from '@core/helpers/utils';

@Component({
  selector: 'app-group-chat-create',
  templateUrl: './group-chat-create.component.html',
  styleUrls: ['./group-chat-create.component.scss']
})
export class GroupChatCreateComponent extends FormUtils<ChatModel.ICreateGroup> implements OnInit {
  public users: UsersModel.IUser[] = [];
  private tempUsers: UsersModel.IUser[] = [];

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

  searchForUsers(name: string) {
    if (AppUtils.isFalsy(name)) {
      this.users = this.tempUsers;
    } else {
      this.usersService.searchForUsers(name)
        .subscribe((users) => {
          this.users = users;
        });
    }
  }

  getUser(id: string) {
    return this.users.find(user => user._id === id);
  }

  ngOnInit() {
    this.usersService.getUsersWithoutMe()
      .subscribe((users => {
        this.users = users;
        this.tempUsers = users;
      }));
  }

  trackBy(index: number, id: string) {
    return id;
  }

}
