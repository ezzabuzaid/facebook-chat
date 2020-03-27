import { Component, OnInit, Input } from '@angular/core';
import { SidebarService, RegisterdSidebar } from '@widget/sidebar';

@Component({
  selector: 'app-navbar-header',
  templateUrl: './navbar-header.component.html',
  styleUrls: ['./navbar-header.component.scss']
})
export class NavbarHeaderComponent implements OnInit {
  constructor(
    private sidebarService: SidebarService
  ) { }

  public get toggled() {
    return this.sidebarService.getSidebar(RegisterdSidebar.NAVBAR).closed;
  }

  ngOnInit() { }

  toggleSidebar() {
    this.sidebarService.getSidebar(RegisterdSidebar.NAVBAR).toggle();
  }

}
