import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, EventEmitter, HostListener, Inject, Input, Output } from '@angular/core';

@Directive({
  selector: '[fullscreen]'
})
export class FullscreenDirective {
  @Input() fullscreen: 'document' | 'current' | any = 'document';
  @Output() onChange = new EventEmitter();

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly elementRef: ElementRef<HTMLElement>
  ) { }

  @HostListener('click')
  request() {
    let docEl: HTMLElement;
    switch (this.fullscreen) {
      case 'current':
        docEl = this.elementRef.nativeElement;
        break;
      case 'document':
        docEl = this.document.documentElement;
        break;
      default:
        docEl = this.document.querySelector(this.fullscreen as any);
        break;
    }
    const requestFullScreen =
      docEl.requestFullscreen || docEl['mozRequestFullScreen'] ||
      docEl['webkitRequestFullScreen'] || docEl['msRequestFullscreen'];
    const cancelFullScreen =
      this.document.exitFullscreen || this.document['mozCancelFullScreen'] ||
      this.document['webkitExitFullscreen'] || this.document['msExitFullscreen'];
    if (
      !this.document.fullscreenElement && !this.document['mozFullScreenElement'] &&
      !this.document['webkitFullscreenElement'] && !this.document['msFullscreenElement']
    ) {
      requestFullScreen.call(docEl);
      this.onChange.emit();
    } else {
      cancelFullScreen.call(this.document);
      this.onChange.emit();
    }
  }

}
