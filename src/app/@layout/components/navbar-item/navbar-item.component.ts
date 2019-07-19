import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SidebarService, RegisterdSidebar } from '@widget/sidebar';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MEDIA_BREAKPOINTS } from '@shared/common';
import { LayoutNavigation } from '@layout/navbar/navigation';
import { LocalStorage } from '@core/helpers';

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
<<<<<<< HEAD
    this.breakpointObserver.observe(MEDIA_BREAKPOINTS.DOWN('md'))
=======
    this.breakpointObserver.observe(MEDIA_BEAKPOINTS.DOWN('md'))
>>>>>>> dd4a445653d6399de285c158a71709e42460d200
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
