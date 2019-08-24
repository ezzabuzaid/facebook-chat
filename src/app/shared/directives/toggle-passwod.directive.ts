import { Directive, ElementRef, Input, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTogglePasswod]'
})
export class TogglePasswodDirective {
  private input: HTMLInputElement = null;
  @Input() private set appTogglePasswod(input) {
    this.input = input;
  }

  constructor(
    private elRef: ElementRef<HTMLInputElement>,
    private renderer: Renderer2,
  ) { }

  @HostListener('click') toggleType() {
    const icon = this.elRef.nativeElement;
    const iconElement = icon.tagName === 'I' ? icon : icon.querySelector('i');
    const type = this.input.type || this.input.getAttribute('type');
    if (type !== 'text') {
      this.renderer.setAttribute(this.input, 'type', 'text');
      this.renderer.removeClass(iconElement, 'fa-lock');
      this.renderer.addClass(iconElement, 'fa-lock-open');
    } else {
      this.renderer.setAttribute(this.input, 'type', 'password');
      this.renderer.addClass(iconElement, 'fa-lock');
      this.renderer.removeClass(iconElement, 'fa-lock-open');
    }
  }

}
