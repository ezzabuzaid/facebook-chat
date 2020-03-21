import { Component, OnInit } from '@angular/core';
import { ChatCardManager } from '../chat-card.manager';
import { IChatCard } from '..';
import { UsersService } from '@shared/services/users';
import { UsersModel } from '@shared/models';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { map, switchMap, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppUtils, typeaheadOperator } from '@core/helpers/utils';

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

  constructor(
    private chatCardManager: ChatCardManager,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.$users = this.autocompleteControl.valueChanges.pipe(
      typeaheadOperator((value) => this.usersService.searchForUsers(value)),
      map(users => users.filter(user => {
        return this.selectedUsers.findIndex(selectedUser => selectedUser._id === user._id) === -1
      }))
    );
  }

  closeCard() {
    this.chatCardManager.removeCard();
  }

  addUser(event: MatAutocompleteSelectedEvent, autoCompleteInput: HTMLInputElement) {
    this.selectedUsers.push(event.option.value);
    this.autocompleteControl.setValue(null);
    autoCompleteInput.value = '';
  }

  removeUser(index) {
    this.selectedUsers.splice(index, 1);
  }

}
