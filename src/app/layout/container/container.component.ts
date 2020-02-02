import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersModel } from '@shared/models';
import { UsersService } from '@shared/services/users';
import { ChatCardManager } from '@partials/chat-card';
import { map } from 'rxjs/operators';
import { TokenService } from '@core/helpers/token';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  public $users = this.usersService.getUsers()
    .pipe(map(list => list.filter(user => user._id !== this.tokenService.decodedToken.id)));

  constructor(
    private usersService: UsersService,
    private chatCardManager: ChatCardManager,
    private tokenService: TokenService
  ) { }

  ngOnInit() { }

  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData.state;
  }

  getState(outlet) {
    return outlet && outlet.activatedRouteData.state;
  }

  openChatCard(user: UsersModel.IUser) {
    this.chatCardManager.createComponent(user);
  }

}
