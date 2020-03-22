import { Component, OnInit } from '@angular/core';
import { ChatCardManager } from '../chat-card.manager';
import { IChatCard } from '..';
import { UsersService } from '@shared/services/users';
import { UsersModel, ChatModel } from '@shared/models';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { map, switchMap, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppUtils, typeaheadOperator } from '@core/helpers/utils';
import { ChatService } from '@shared/services/chat';

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
  $conversation: Observable<{
    conversation,
    user
  }> = null;

  constructor(
    private chatCardManager: ChatCardManager,
    private usersService: UsersService,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.$users = this.autocompleteControl.valueChanges.pipe(
      filter(AppUtils.isTruthy),
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
    this.tryConversation(this.selectedUsers[0]);
  }

  tryConversation(user: UsersModel.IUser) {
    if (this.selectedUsers.length === 1) {
      this.$conversation = this.chatService.getConversation(user._id)
        .pipe(map((conversation) => {
          if (conversation) {
            return {
              conversation,
              user
            }
          }
          return null;
        }));
    } else {
      this.$conversation = null;
    }

  }

}
