import { Component, OnInit } from '@angular/core';
import { UsersService } from '@shared/services/users';
import { UserModel } from '@shared/user/user.model';
import { UsersModel } from '@shared/models';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public $users = this.usersService.getUsers();

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() { }

  followUser(user: UsersModel.IUser) {

  }

}
