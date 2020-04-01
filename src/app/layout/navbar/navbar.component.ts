import { Component, Inject } from '@angular/core';
import navigation from './navigation';
import { DOCUMENT } from '@angular/common';
import { UserService } from '@shared/user';
import { AppUtils } from '@core/helpers/utils';
import { RegisterdSidebar, SidebarService } from '@widget/sidebar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public navigationMenu = navigation;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private userService: UserService,
    private sidebarService: SidebarService
  ) { }

  logout() {
    this.userService.logout();
  }

  closeSidebar() {
    console.log('min width exceded');
    this.sidebarService.getSidebar(RegisterdSidebar.NAVBAR).close();
  }

}
