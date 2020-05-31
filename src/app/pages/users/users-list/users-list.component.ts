import { Component, OnInit } from '@angular/core';
import { UsersModel } from '@shared/models';
import { UsersService } from '@shared/services/users';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public $users = this.usersService.getUsers();

  constructor(
    private readonly usersService: UsersService
  ) { }

  ngOnInit() { }

  followUser(user: UsersModel.IUser) {

  }

}
