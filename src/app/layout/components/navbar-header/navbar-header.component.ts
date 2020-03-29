import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SidebarService, RegisterdSidebar } from '@widget/sidebar';
import { UsersService } from '@shared/services/users';

@Component({
  selector: 'app-navbar-header',
  templateUrl: './navbar-header.component.html',
  styleUrls: ['./navbar-header.component.scss']
})
export class NavbarHeaderComponent implements OnInit {
  $user = this.usersService.getCurrentUser();
  constructor(
    private sidebarService: SidebarService,
    private usersService: UsersService
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
