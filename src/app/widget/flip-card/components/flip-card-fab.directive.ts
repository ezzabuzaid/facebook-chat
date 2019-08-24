import { Directive, TemplateRef, ViewContainerRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFlipCardFab]',
  exportAs: 'flipCardFab'
})
export class FlipCardFabDirective {
  isPresented = false;
  constructor(
    private template: TemplateRef<any>,
    private vcf: ViewContainerRef,
    private renderer: Renderer2
  ) { }

  addCard() {
    if (this.isPresented) {
      this.vcf.clear();
    } else {
      this.vcf.createEmbeddedView(this.template);
      const comment = this.vcf.element.nativeElement;
      const element = this.renderer.nextSibling(comment);
      this.scrollToCard(element);
    }
    this.isPresented = !this.isPresented;
  }

  scrollToCard(cardElement) {
    cardElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

}
