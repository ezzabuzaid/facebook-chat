import { Directive, HostListener, Renderer2, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appTextAreaAutoResize]'
})
export class TextAreaAutoResizeDirective implements OnInit {
  initialHeight;
  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef<HTMLTextAreaElement>
  ) { }

  ngOnInit() {
    const el = this.elRef.nativeElement;
    this.renderer.setStyle(el, 'overflow', 'hidden');
    this.renderer.setStyle(el, 'resize', 'none');
    this.initialHeight = el.clientHeight;
  }

  @HostListener('input') resizeTextarea() {
    const el = this.elRef.nativeElement;
    this.renderer.setStyle(el, 'height', `${this.initialHeight}px`);
    this.renderer.setStyle(el, 'height', `${el.scrollHeight + 12}px`);
  }
}
