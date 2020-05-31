import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {
  @Output() appHover = new EventEmitter();

  constructor() { }

  @HostListener('mouseenter') mouseenter() {
    this.appHover.emit();
  }
  @HostListener('mouseleave') mouseleave() {
    this.appHover.emit();
  }

}
