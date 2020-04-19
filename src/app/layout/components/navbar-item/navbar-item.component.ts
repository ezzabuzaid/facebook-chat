import { Component, OnInit, Input, OnDestroy, HostBinding } from '@angular/core';
import { SidebarService, RegisterdSidebar } from 'app/widget/sidebar';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { MEDIA_BREAKPOINTS } from '@shared/common';
import { NavigationItem } from '@layout/navbar/navigation';
import { AppUtils } from '@core/helpers/utils';

@Component({
  selector: 'app-navbar-item',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.scss']
})
export class NavbarItemComponent implements OnInit, OnDestroy {
  @Input() public item: NavigationItem;
  @Input() public collapse = false;
  @Input() @HostBinding('class.dense') dense = false;
  private subscribtion = new Subject();

  constructor(
    private sidebarService: SidebarService,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() { }

  public get toggled() {
    return this.sidebarService.getSidebar(RegisterdSidebar.NAVBAR).closed;
  }

  toggleNavbar() {
    if (this.breakpointObserver.isMatched(MEDIA_BREAKPOINTS.DOWN('md')) && !this.collapse) {
      this.sidebarService.getSidebar(RegisterdSidebar.NAVBAR).toggle();
    }
  }

  ngOnDestroy() {
    AppUtils.unsubscribe(this.subscribtion);
  }

}

