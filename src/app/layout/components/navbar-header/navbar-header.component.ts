import { Component, OnInit } from '@angular/core';
import { UsersService } from '@shared/services/users';
import { RegisterdSidebar, SidebarService } from '@widget/sidebar';

@Component({
  selector: 'app-navbar-header',
  templateUrl: './navbar-header.component.html',
  styleUrls: ['./navbar-header.component.scss']
})
export class NavbarHeaderComponent implements OnInit {
  $user = this.usersService.getCurrentUser();
  constructor(
    private readonly sidebarService: SidebarService,
    private readonly usersService: UsersService
  ) { }

  public get toggled() {
    return this.sidebarService.getSidebar(RegisterdSidebar.NAVBAR).closed;
  }

  ngOnInit() {

  }

  toggleSidebar() {
    this.sidebarService.getSidebar(RegisterdSidebar.NAVBAR).toggle();
  }

}
