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
  @Input() @HostBinding('class.right') public right = false;
  @Input() resizable = true;
  @HostBinding('class.resizing') public resizing = false;
  @Input() public minWidth = 0;
  @Input() public maxWidth = 0;
  @Input() public name = '';

  @Output() onToggle = new EventEmitter<ISidebarToggle>();
  @Output() maxWidthExceeded = new EventEmitter<number>();
  @Output() minWidthExceeded = new EventEmitter<number>();

  private initialTouchPos;
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

  ngAfterViewInit() {
    if (this.resizable) {
      this.resizer.style[this.right ? 'right' : 'left'] = this.window.getComputedStyle(this.element).getPropertyValue('--width');
      this.attachEvents(this.element.querySelector('.resizer'))
    }
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
    this.resizing = true;

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

    this.initialTouchPos = this.getVector(evt);
  }

  private handleGestureEnd(evt) {
    evt.preventDefault();
    console.log('handleGestureEnd');
    this.resizing = false;

    if (evt.touches && evt.touches.length > 0) {
      return;
    }

    // Remove Event Listeners
    if (this.window['PointerEvent']) {
      evt.target.releasePointerCapture(evt.pointerId);
    } else {
      document.removeEventListener('mousemove', this.handleGestureMove.bind(this), true);
      document.removeEventListener('mouseup', this.handleGestureEnd.bind(this), true);
    }

    const vector = this.getVector(evt);
    if (this.isExceededMaxWidth(vector.offset)) {
      this.maxWidthExceeded.emit();
    }
    if (this.isExceededMinWidth(vector.offset)) {
      this.minWidthExceeded.emit();
    }

    // this.window.getComputedStyle(this.element).setProperty('--width', `${vector.offset}px`);
    this.element.style.setProperty('--width', `${vector.offset}px`);

    this.initialTouchPos = null;
  }

  private handleGestureMove(evt) {
    evt.preventDefault();

    if (AppUtils.isNullorUndefined(this.initialTouchPos)) {
      return;
    }
    const vector = this.getVector(evt);
    if (this.isExceededMaxWidth(vector.offset) || this.isExceededMinWidth(vector.offset)) {
      return;
    }

    this.resizer.style.setProperty(vector.direction, `${vector.offset}px`);

  }

  private getVector(evt) {
    const point = { x: evt.x, y: evt.y };
    let element = this.element;
    let maxOffsetLeft = 0;
    let maxOffsetTop = 0;
    while (element.offsetParent) {
      maxOffsetLeft += element.offsetLeft;
      maxOffsetTop += element.offsetTop;
      element = element.offsetParent as HTMLElement;
    }

    point.x -= maxOffsetLeft;
    point.y -= maxOffsetTop;
    point.x = this.right ? this.element.offsetWidth - point.x : point.x;

    const maxWidth = this.getDrawerMaxOffset('maxWidth') || this.element.offsetWidth;
    const minWidth = this.getDrawerMaxOffset('minWidth') || 0;
    console.log(minWidth);
    if (point.x >= maxWidth) {
      point.x = maxWidth;
    }
    if (point.x < minWidth) {
      point.x = minWidth;
    }
    return {
      direction: this.right ? 'right' : 'left',
      offset: point.x
    };
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

  get resizer() {
    return this.element.querySelector('.resizer') as HTMLElement;
  }

  private isExceededMaxWidth(pixels: number) {
    const maxWidth = this.getDrawerMaxOffset('maxWidth') || false;
    return maxWidth && pixels >= maxWidth;
  }

  private isExceededMinWidth(pixels: number) {
    return pixels < this.getDrawerMaxOffset('minWidth');
  }

  private getDrawerMaxOffset(property: keyof CSSStyleDeclaration) {
    return this.formatWidthValue(this.cssValue(this.drawer, property));
  }

  private formatWidthValue(width: string): number {
    let value = width as any;
    if (width.includes('%')) {
      value = this.percentegeToPx(+width.replace('%', ''));
    } else if (width.includes('px')) {
      value = +width.replace('px', '');
    }
    if (isNaN(value)) {
      return null;
    }
    return value;
  }

  private cssValue(element: HTMLElement, property: keyof CSSStyleDeclaration) {
    return this.window.getComputedStyle(element)[property];
  }

}

interface ISidebarToggle {
  toggle: boolean;
}

