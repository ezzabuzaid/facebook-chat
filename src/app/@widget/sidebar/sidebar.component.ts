import { Component, OnInit, ElementRef, Renderer2, ViewChild, OnDestroy, Input, HostBinding, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { SidebarService } from './sidebar.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntil, skip } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { MEDIA_BEAKPOINTS } from '@shared/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  @ViewChild('panel', { static: false }) drawer: ElementRef<HTMLElement>;
  @Input() name = '';
  private subscribtion = new Subject();
  onToggle = new Subject<ISidebarToggle>();
  // onFold = new Subject<boolean>();
  // foldeable = true;
  // @HostBinding('class.folded') folded = false;
  @HostBinding('class.mobile') mobile = this.breakpointObserver.isMatched(MEDIA_BEAKPOINTS.DOWN('md'));
  @HostBinding('class.toggled') toggled = false;
  private IsMobile = false;
  constructor(
    private renderer: Renderer2,
    private sidebarService: SidebarService,
    private breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.sidebarService.registerSidebar(this.name, this);
    this.breakpointObserver.observe(MEDIA_BEAKPOINTS.DOWN('md'))
      .pipe(
        takeUntil(this.subscribtion),
        skip(1)
      )
      .subscribe(({ matches }) => {
        // this.foldeable = !matches;
        this.IsMobile = matches;
        if (matches) {
          this.mobile = !this.mobile;
        }
      });
  }


  toggleSidebar() {
    // const klass = this.foldeable ? 'folded' : 'mobile';

    // if (klass === 'folded') {
    // this.onFold.next(this.toggled = !this.toggled);
    // this.folded = !this.fold/ed;
    // } else {
    // this.mobile = !this.mobile;
    // }
    console.log('cloc');
    this.toggled = !this.toggled;
    this.onToggle.next({ toggle: this.toggled, mobile: this.IsMobile });
  }

  ngOnDestroy() {
    this.subscribtion.next();
    this.subscribtion.complete();
  }

}
interface ISidebarToggle {
  toggle: boolean;
  mobile: boolean;
}
