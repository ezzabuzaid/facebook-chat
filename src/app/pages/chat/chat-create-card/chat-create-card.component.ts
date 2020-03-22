import { Component, OnInit } from '@angular/core';
import { ChatCardManager } from '../chat-card.manager';
import { IChatCard } from '..';
import { UsersService } from '@shared/services/users';
import { UsersModel, ChatModel } from '@shared/models';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { map, filter, share } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppUtils, typeaheadOperator } from '@core/helpers/utils';
import { ChatService } from '@shared/services/chat';
import { UserCardComponent } from '../conversation-chat-card/conversation-chat-card.component';
import { ChatManager } from '../chat.manager';
import { TokenService } from '@core/helpers/token';

@Component({
  selector: 'app-chat-create-card',
  templateUrl: './chat-create-card.component.html',
  styleUrls: ['./chat-create-card.component.scss']
})
export class ChatCreateCardComponent implements OnInit, IChatCard<any> {
  data: any;
  id: string;
  $users: Observable<UsersModel.IUser[]> = null;
  selectedUsers: UsersModel.IUser[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  autocompleteControl = new FormControl();
  $conversation: Observable<ChatModel.IConversation> = null;

  constructor(
    private chatCardManager: ChatCardManager,
    private usersService: UsersService,
    private chatService: ChatService,
  ) { }

  ngOnInit() {
    this.$users = this.autocompleteControl.valueChanges.pipe(
      filter(value => AppUtils.isFalsy(AppUtils.isEmptyString(value))),
      typeaheadOperator((value) => this.usersService.searchForUsers(value)),
      map(users => users.filter(user => {
        return this.selectedUsers.findIndex(selectedUser => selectedUser._id === user._id) === -1
      }))
    );
  }

  closeCard() {
    this.chatCardManager.removeCard();
  }

  selectUser(event: MatAutocompleteSelectedEvent, autoCompleteInput: HTMLInputElement) {
    const user = event.option.value as UsersModel.IUser;
    this.selectedUsers.push(user);
    this.autocompleteControl.setValue(null);
    autoCompleteInput.value = '';
    this.tryConversation(user);
  }

  removeUser(index: number) {
    this.selectedUsers.splice(index, 1);
    this.tryConversation(this.firstSelectedUser);
  }

  tryConversation(user: UsersModel.IUser) {
    if (this.selectedUsers.length === 1) {
      this.$conversation = this.chatService.getConversation(user._id)
        .pipe(share());
    } else {
      this.$conversation = null;
    }

  }

  createConvesationAndSendMessage(text: string) {
    this.chatService.createConversation(this.firstSelectedUser._id, text)
      .subscribe((conversation) => {
        this.chatCardManager.open(UserCardComponent, {
          id: this.firstSelectedUser._id,
          data: this.firstSelectedUser
        });
      });
  }

  jumpToConversationCard(text: string) {
    this.chatCardManager.open(UserCardComponent, {
      id: this.firstSelectedUser._id,
      data: this.firstSelectedUser
    });
  }

  get firstSelectedUser() {
    return this.selectedUsers[0];
  }

}
