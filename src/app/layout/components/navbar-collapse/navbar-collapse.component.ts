import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { AppUtils } from '@core/helpers/utils';
import { NavigationItem } from '@layout/navbar/navigation';
import { RegisterdSidebar, SidebarManager } from '@widget/sidebar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-navbar-collapse',
  templateUrl: './navbar-collapse.component.html',
  styleUrls: ['./navbar-collapse.component.scss'],
})
export class NavbarCollapseComponent implements OnInit, OnDestroy {
  private readonly subscription = new Subject();
  private readonly classList = this.elRef.nativeElement.classList;
  private readonly navbarInstance = this.sidebarService.getSidebar(RegisterdSidebar.NAVBAR);
  @Input() public item: NavigationItem;

  constructor(
    private readonly elRef: ElementRef<HTMLElement>,
    private readonly sidebarService: SidebarManager,
  ) { }

  ngOnInit() {
    this.navbarInstance.onToggle
      .pipe(
        takeUntil(this.subscription),
      )
      .subscribe(({ toggle }) => {
        if (toggle) {
          this.classList.remove('expanded');
        }
      });
  }

  expand(shouldExpand = !this.classList.contains('expanded')) {
    if (this.navbarInstance.opened) {
      this.navbarInstance.open();
    }
    if (shouldExpand) {
      this.classList.add('expanded');
    } else {
      this.classList.remove('expanded');
    }
  }

  ngOnDestroy() {
    AppUtils.unsubscribe(this.subscription);
  }

}
