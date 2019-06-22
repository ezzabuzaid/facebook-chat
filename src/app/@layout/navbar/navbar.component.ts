import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import navigation from './navigation';
import { DOCUMENT } from '@angular/common';
import { LocalStorage } from '@shared/services';
import { Constants } from '@core/helpers/constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public navigationMenu = navigation;

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private localStorage: LocalStorage
  ) { }

  logout() {
    this.router.navigate([`/${Constants.Routing.LOGIN}`]);
    this.localStorage.clear();
  }

  perfectScrollBarHeight(header: HTMLElement) {
    return this.document.documentElement.clientHeight - header.clientHeight;
  }
}

//   ngAfterViewInit() {
//     const moveableElement = document.getElementById('nabvar-controller');
//     let rafPending = false;
//     let initialTouchPos = null;
//     // Check if pointer events are supported.
//     if (window['PointerEvent']) {
//       // Add Pointer Event Listener
//       moveableElement.addEventListener('pointerdown', handleGestureStart, true);
//       moveableElement.addEventListener('pointermove', handleGestureMove, true);
//       moveableElement.addEventListener('pointerup', handleGestureEnd, true);
//       moveableElement.addEventListener('pointercancel', handleGestureEnd, true);
//     } else {
//       // Add Touch Listener
//       moveableElement.addEventListener('touchstart', handleGestureStart, true);
//       moveableElement.addEventListener('touchmove', handleGestureMove, true);
//       moveableElement.addEventListener('touchend', handleGestureEnd, true);
//       moveableElement.addEventListener('touchcancel', handleGestureEnd, true);

//       // Add Mouse Listener
//       moveableElement.addEventListener('mousedown', handleGestureStart, true);
//     }

//     // Handle the start of gestures
//     function handleGestureStart(evt) {
//       evt.preventDefault();
//       console.log('handleGestureStart => ', evt);

//       if (evt.touches && evt.touches.length > 1) {
//         return;
//       }

//       // Add the move and end listeners
//       if (window['PointerEvent']) {
//         evt.target.setPointerCapture(evt.pointerId);
//       } else {
//         // Add Mouse Listeners
//         document.addEventListener('mousemove', handleGestureMove, true);
//         document.addEventListener('mouseup', handleGestureEnd, true);
//       }

//       // initialTouchPos = getGesturePointFromEvent(evt);
//       initialTouchPos = true;
//     }

//     // Handle end gestures
//     function handleGestureEnd(evt) {
//       evt.preventDefault();
//       console.log('handleGestureEnd => ', evt);

//       if (evt.touches && evt.touches.length > 0) {
//         return;
//       }

//       rafPending = false;

//       // Remove Event Listeners
//       if (window['PointerEvent']) {
//         evt.target.releasePointerCapture(evt.pointerId);
//       } else {
//         // Remove Mouse Listeners
//         document.removeEventListener('mousemove', handleGestureMove, true);
//         document.removeEventListener('mouseup', handleGestureEnd, true);
//       }

//       // updateSwipeRestPosition();

//       initialTouchPos = null;
//     }
//     function handleGestureMove(evt) {
//       evt.preventDefault();

//       if (!initialTouchPos) {
//         return;
//       }
//       console.log('handleGestureMove => ', evt.screenX);
//       onAnimFrame(getGesturePointFromEvent(evt));
//       if (rafPending) {
//         return;
//       }

//       rafPending = true;
//       // window.requestAnimationFrame(onAnimFrame);
//     }

//     function getGesturePointFromEvent(evt) {
//       const point = { x: null, y: null, screenX: null };
//       if (evt.targetTouches) {
//         // Prefer Touch Events
//         point.x = evt.targetTouches[0].clientX;
//         point.y = evt.targetTouches[0].clientY;
//       } else {
//         // Either Mouse event or Pointer Event
//         point.x = evt.x;
//         point.y = evt.y;
//         point.screenX = evt.screenX;
//       }

//       return point;
//     }
//     let lastScreenPosition = 0;
//     function onAnimFrame(dimension) {
//       if (!rafPending) {
//         return;
//       }

//       const appSidebar = document.querySelector('app-sidebar');
//       const style = getComputedStyle(appSidebar);
//       const currentWidth = parseInt(style.getPropertyValue('--width'), 5);

//       if (dimension.screenX >= lastScreenPosition) {
//         console.log('right');
//         lastScreenPosition = dimension.screenX;
//       } else {
//         console.log('left');
//         lastScreenPosition = dimension.screenX;
//       }

//       console.log(currentWidth);
//       if (currentWidth < 16 && !(dimension.screenX >= lastScreenPosition)) {
//         console.log('You cannot make it less');
//         return;
//       }

//       const screenWidth = window.screen.availWidth;
//       const percentage = dimension.x / screenWidth * 100;
//       appSidebar['style'].setProperty('--width', `${percentage}%`);
//       rafPending = false;
//     }


//   }
// }

// an event should fire to start moving and this will be mousedown if the case was mouse
// or pointerdown or touchstart
