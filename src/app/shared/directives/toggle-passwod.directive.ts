import { Directive, ElementRef, Input, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[togglePasswod]'
})
export class TogglePasswodDirective {
  @Input() togglePasswod: HTMLInputElement;

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) { }

  @HostListener('click') toggleType() {
    const iconElement = this.elRef.nativeElement;
    const type = this.togglePasswod.type || this.togglePasswod.getAttribute('type');
    if (type !== 'text') {
      this.renderer.setAttribute(this.togglePasswod, 'type', 'text');
      iconElement.textContent = 'lock_open';
    } else {
      this.renderer.setAttribute(this.togglePasswod, 'type', 'password');
      iconElement.textContent = 'lock';
    }
  }

}
