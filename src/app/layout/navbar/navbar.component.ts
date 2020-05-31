import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AppUtils } from '@core/helpers/utils';
import { UserService } from '@shared/account';
import { RegisterdSidebar, SidebarService } from '@widget/sidebar';
import navigation from './navigation';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public navigationMenu = navigation;

  constructor (
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly userService: UserService,
    private readonly sidebarService: SidebarService
  ) { }

  logout() {
    this.userService.logout();
  }

  closeSidebar() {
    console.log('min width exceded');
    this.sidebarService.getSidebar(RegisterdSidebar.NAVBAR).close();
  }

}
