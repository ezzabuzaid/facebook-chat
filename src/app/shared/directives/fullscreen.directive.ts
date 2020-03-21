import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[fullscreen]'
})
export class FullscreenDirective {

  @HostListener('click')
  fullScreen() {
    const doc = window.document;
    const docEl = doc.documentElement;
    const requestFullScreen =
      docEl.requestFullscreen || docEl['mozRequestFullScreen'] ||
      docEl['webkitRequestFullScreen'] || docEl['msRequestFullscreen'];
    const cancelFullScreen =
      doc.exitFullscreen || doc['mozCancelFullScreen'] ||
      doc['webkitExitFullscreen'] || doc['msExitFullscreen'];
    if (
      !doc.fullscreenElement && !doc['mozFullScreenElement'] &&
      !doc['webkitFullscreenElement'] && !doc['msFullscreenElement']
    ) {
      requestFullScreen.call(docEl);
    } else {
      cancelFullScreen.call(doc);
    }
  }

}
