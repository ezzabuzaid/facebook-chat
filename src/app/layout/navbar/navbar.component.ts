import { Component } from '@angular/core';
import { ApplicationUser } from '@core/application-user';
import { RegisterdSidebar, SidebarManager } from '@widget/sidebar';
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
    private readonly applicationUser: ApplicationUser,
    private readonly sidebarService: SidebarManager
  ) { }

  logout() {
    this.applicationUser.logout();
  }

  closeSidebar() {
    console.log('min width exceded');
    this.sidebarService.getSidebar(RegisterdSidebar.NAVBAR).close();
  }

}
