import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsersService } from '@shared/services/users';
import { FormUtils } from '@partials/form';
import { Form, Field } from '@shared/common';

class Group { }

@Component({
  selector: 'app-group-chat-create',
  templateUrl: './group-chat-create.component.html',
  styleUrls: ['./group-chat-create.component.scss']
})
export class GroupChatCreateComponent extends FormUtils<any> implements OnInit {
  public $users = this.usersService.getUsersWithoutMe();


  constructor(
    private usersService: UsersService,
    public dialogRef: MatDialogRef<GroupChatCreateComponent>,
  ) {
    super(
      new Form([
        new Field('title'),
        // new Field('title'),
      ])
    );
  }

  closeDialog() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  ngOnInit() { }

}
