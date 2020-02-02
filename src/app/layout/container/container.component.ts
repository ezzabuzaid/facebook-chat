import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersModel } from '@shared/models';
import { UsersService } from '@shared/services/users';
import { PopupService } from '@widget/popup';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  public $users = this.usersService.getUsers();

  constructor(
    private usersService: UsersService,
    private popupService: PopupService
  ) { }

  ngOnInit() { }

  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData.state;
  }

  getState(outlet) {
    return outlet && outlet.activatedRouteData.state;
  }

  openPrompt(user: UsersModel.IUser) {
    this.popupService.prompt({
      data: {
        title: 'Send message'
      }
    })
      .afterClosed()
      .subscribe((result) => {
        console.log('Result => ', result);
      });
  }

}
