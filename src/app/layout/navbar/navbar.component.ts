import { Component, Inject } from '@angular/core';
import navigation from './navigation';
import { DOCUMENT } from '@angular/common';
import { UserService } from '@shared/user';
import { AppUtils } from '@core/helpers/utils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public navigationMenu = navigation;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private userService: UserService
  ) { }

  logout() {
    this.userService.logout();
  }

}

// an event should fire to start moving and this will be mousedown if the case was mouse
// or pointerdown or touchstart
