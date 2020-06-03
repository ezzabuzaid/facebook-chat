import { Component } from '@angular/core';
import { UserService } from '@shared/account';
import { RegisterdSidebar, SidebarService } from '@widget/sidebar';
import navigation, { NavigationItem } from './navigation';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public navigationMenu = navigation;
  logoutNaviagtionItem = new NavigationItem({
    icon: 'exit_to_app',
    title: 'Logout',
    type: 'item',
  });
  constructor(
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
