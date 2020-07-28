import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTextAreaAutoResize]'
})
export class TextAreaAutoResizeDirective implements OnInit {
  initialHeight;
  constructor(
    private readonly renderer: Renderer2,
    private readonly elRef: ElementRef<HTMLTextAreaElement>
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
