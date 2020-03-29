import { Component, OnInit, ElementRef, Input, HostBinding, Output, EventEmitter, Inject } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { AppUtils } from '@core/helpers/utils';
import { WINDOW } from '@shared/common';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() @HostBinding('class.toggled') public closed = false;
  @Input() public name = '';

  @Output() onToggle = new EventEmitter<ISidebarToggle>();
  @Output() maxWidthExceeded = new EventEmitter<number>();
  @Output() minWidthExceeded = new EventEmitter<number>();

  private initialTouchPos;
  private rafPending;
  constructor(
    private sidebarService: SidebarService,
    private elementRef: ElementRef<HTMLElement>,
    @Inject(WINDOW) private window: Window,
  ) { }

  get element() {
    return this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.sidebarService.registerSidebar(this.name, this);
  }

  toggle(value = !this.closed) {
    this.closed = value;
    this.onToggle.next({ toggle: this.closed });
  }

  open() {
    this.toggle(false);
  }

  close() {
    this.toggle(true);
  }

  private attachEvents(element: HTMLElement) {
    // Check if pointer events are supported.
    if (this.window['PointerEvent']) {
      // Add Pointer Event Listener
      element.addEventListener('pointerdown', this.handleGestureStart.bind(this), true);
      element.addEventListener('pointermove', this.handleGestureMove.bind(this), true);
      element.addEventListener('pointerup', this.handleGestureEnd.bind(this), true);
      element.addEventListener('pointercancel', this.handleGestureEnd.bind(this), true);
    } else {
      // Add Touch Listener
      element.addEventListener('touchstart', this.handleGestureStart.bind(this), true);
      element.addEventListener('touchmove', this.handleGestureMove.bind(this), true);
      element.addEventListener('touchend', this.handleGestureEnd.bind(this), true);
      element.addEventListener('touchcancel', this.handleGestureEnd.bind(this), true);

      // Add Mouse Listener
      element.addEventListener('mousedown', this.handleGestureStart.bind(this), true);
    }
  }

  private handleGestureStart(evt) {
    evt.preventDefault();
    console.log('handleGestureStart');

    if (evt.touches && evt.touches.length > 1) {
      return;
    }

    // Add the move and end listeners
    if (this.window['PointerEvent']) {
      evt.target.setPointerCapture(evt.pointerId);
    } else {
      // Add Mouse Listeners
      document.addEventListener('mousemove', this.handleGestureMove.bind(this), true);
      document.addEventListener('mouseup', this.handleGestureEnd.bind(this), true);
    }

    this.initialTouchPos = this.getGesturePointFromEvent(evt);
  }

  private handleGestureEnd(evt) {
    evt.preventDefault();
    console.log('handleGestureEnd');

    if (evt.touches && evt.touches.length > 0) {
      return;
    }

    this.rafPending = false;

    // Remove Event Listeners
    if (this.window['PointerEvent']) {
      evt.target.releasePointerCapture(evt.pointerId);
    } else {
      document.removeEventListener('mousemove', this.handleGestureMove.bind(this), true);
      document.removeEventListener('mouseup', this.handleGestureEnd.bind(this), true);
    }

    const dimension = this.getGesturePointFromEvent(evt);
    if (this.isExceededMaxWidth(dimension.x)) {
      this.maxWidthExceeded.emit();
      if (this.closed) {
        this.open();
      }
    }
    if (this.isExceededMinWidth(dimension.x)) {
      this.minWidthExceeded.emit();
      if (!this.closed) {
        this.close();
      }
    }
    this.element.style.removeProperty('--width');

    this.initialTouchPos = null;
  }

  private handleGestureMove(evt) {
    evt.preventDefault();

    if (AppUtils.isNullorUndefined(this.initialTouchPos)) {
      return;
    }

    const dimension = this.getGesturePointFromEvent(evt);
    if (this.isExceededMaxWidth(dimension.x)) {
      return;
    }
    if (this.isExceededMinWidth(dimension.x)) {
      return;
    }

    this.element.style.setProperty('--width', `${dimension.x}px`);


    // onAnimFrame(getGesturePointFromEvent(evt));
    if (this.rafPending) {
      return;
    }

    this.rafPending = true;
    // window.requestAnimationFrame(onAnimFrame);
  }

  private getGesturePointFromEvent(evt) {
    const point = { x: null, y: null };
    if (evt.targetTouches) {
      point.x = evt.targetTouches[0].clientX;
      point.y = evt.targetTouches[0].clientY;
    } else {
      point.x = evt.x;
      point.y = evt.y;
    }
    return point;
  }

  ngAfterViewInit() {
    this.attachEvents(this.element.querySelector('.resizer'))
    //   let rafPending = false;
    //   let initialTouchPos = null;




    //   let lastScreenPosition = 0;
    //   function onAnimFrame(dimension) {
    //     if (!rafPending) {
    //       return;
    //     }

    //     const appSidebar = document.querySelector('app-sidebar');
    //     const style = getComputedStyle(appSidebar);
    //     const currentWidth = parseInt(style.getPropertyValue('--width'), 5);

    //     if (dimension.screenX >= lastScreenPosition) {
    //       console.log('right');
    //       lastScreenPosition = dimension.screenX;
    //     } else {
    //       console.log('left');
    //       lastScreenPosition = dimension.screenX;
    //     }

    //     console.log(currentWidth);
    //     if (currentWidth < 16 && !(dimension.screenX >= lastScreenPosition)) {
    //       console.log('You cannot make it less');
    //       return;
    //     }

    //     const screenWidth = window.screen.availWidth;
    //     const percentage = dimension.x / screenWidth * 100;
    //     appSidebar['style'].setProperty('--width', `${ percentage } % `);
    //     rafPending = false;
    //   }

  }

  private pxToPercentege(pixels: number) {
    const screenWidth = this.window.screen.width;
    return pixels / screenWidth * 100;
  }

  private percentegeToPx(percentge: number) {
    return percentge * 1680 / 100;
  }

  get drawer() {
    return this.element.querySelector('[sidebar-drawer]') as HTMLElement;
  }

  private isExceededMaxWidth(pixels: number) {
    const style = (element: HTMLElement) => this.window.getComputedStyle(element);
    const maxWidthPx = this.percentegeToPx(+style(this.drawer).maxWidth.replace('%', ''));
    return pixels >= maxWidthPx;
  }

  private isExceededMinWidth(pixels: number) {
    const style = (element: HTMLElement) => this.window.getComputedStyle(element);
    const minWidthPx = this.percentegeToPx(+style(this.drawer).minWidth.replace('%', ''));
    const width = isNaN(minWidthPx) ? 100 : minWidthPx + 100;
    return pixels < width;
  }

}

interface ISidebarToggle {
  toggle: boolean;
}
