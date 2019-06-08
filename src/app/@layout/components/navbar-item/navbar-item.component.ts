import { Component, OnInit, Input, OnDestroy, HostListener } from '@angular/core';
import { SidebarService, RegisterdSidebar } from '@widget/sidebar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BREACKPOINTS } from '@shared/common';
import { LocalStorage } from '@core/helpers';
import { LayoutNavigation } from '@layout/navbar/navigation';

@Component({
  selector: 'app-navbar-item',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.scss']
})
export class NavbarItemComponent implements OnInit, OnDestroy {
  @Input() public item: LayoutNavigation;
  @Input() public collapse = false;
  private _subscribtion = new Subject();
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
      .pipe(takeUntil(this._subscribtion))
      .subscribe(({ matches }) => {
        this.isTable = matches;
      });
  }

  // TODO shortcuts service
  addShortcut() { }

  toggleNavbar() {
    if (this.isTable && !this.collapse) {
      this.sidebarService.getSidebar(RegisterdSidebar.NAVBAR).toggleSidebar();
    }
  }

  ngOnDestroy() {
    this._subscribtion.next();
    this._subscribtion.complete();
  }

}


class ShortcutService {


  constructor(
    private localstorage: LocalStorage
  ) {

  }

  addShortcut(item: LayoutNavigation) {
    const shortcuts = this.localstorage.get<LayoutNavigation[]>('shortcuts') || [];
    shortcuts.push(item);
    this.localstorage.set('shortcuts', shortcuts);
  }

  removeShortcut() {
  }


}