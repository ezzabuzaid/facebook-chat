import { Component, OnInit, Input, OnDestroy, HostListener } from '@angular/core';
import { SidebarService, RegisterdSidebar } from '@widget/sidebar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BREACKPOINTS } from '@shared/common';

@Component({
  selector: 'app-navbar-item',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.scss']
})
export class NavbarItemComponent implements OnInit, OnDestroy {
  @Input() item;
  @Input() collapse = false;
  subscribtion = new Subject();
  // @HostListener('click') _() {
  //   this.toggleNavbar();
  // }
  private isTable = false;
  constructor(
    private sidebarService: SidebarService,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {
    this.breakpointObserver.observe(BREACKPOINTS.TABLET)
      .pipe(takeUntil(this.subscribtion))
      .subscribe(({ matches }) => {
        this.isTable = matches;
      });
  }

  toggleNavbar() {
    if (this.isTable && !this.collapse) {
      this.sidebarService.getSidebar(RegisterdSidebar.NAVBAR).toggleSidebar();
    }
  }

  ngOnDestroy() {
    this.subscribtion.next();
    this.subscribtion.complete();
  }

}
