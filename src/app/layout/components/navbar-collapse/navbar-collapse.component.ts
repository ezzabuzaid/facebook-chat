import { Component, OnInit, Input, ElementRef, HostBinding, OnDestroy } from '@angular/core';
import { SidebarService, RegisterdSidebar } from '@widget/sidebar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-navbar-collapse',
  templateUrl: './navbar-collapse.component.html',
  styleUrls: ['./navbar-collapse.component.scss'],
})
export class NavbarCollapseComponent implements OnInit, OnDestroy {
  @Input() public item;
  private _subscribtion = new Subject();
  private classList = this.elRef.nativeElement.classList;
  private navbarInstance = this.sidebarService.getSidebar(RegisterdSidebar.NAVBAR);
  constructor(
    private elRef: ElementRef<HTMLElement>,
    private sidebarService: SidebarService,
  ) { }

  ngOnInit() {
    this.navbarInstance.onToggle
      .pipe(
        takeUntil(this._subscribtion),
      )
      .subscribe(({ toggle }) => {
        if (toggle) {
          this.classList.remove('expanded');
        }
      });
  }

  expand(shouldExpand = !this.classList.contains('expanded')) {
    if (this.navbarInstance.closed) {
      this.navbarInstance.open();
    }
    if (shouldExpand) {
      this.classList.add('expanded');
    } else {
      this.classList.remove('expanded');
    }
  }

  ngOnDestroy() {
    this._subscribtion.next();
    this._subscribtion.complete();
  }

}
