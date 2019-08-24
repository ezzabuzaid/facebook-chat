import { Directive, ElementRef, Inject, HostListener } from '@angular/core';
import { FlipCardComponent } from './flip-card/flip-card.component';

@Directive({
  selector: '[appFlipCard]'
})
export class FlipCardDirective {

  constructor(
    public elRef: ElementRef,
    @Inject(FlipCardComponent) private parent: FlipCardComponent
  ) { }

  @HostListener('click') filpCard() {
    const flipped = this.parent.flipped;
    this.parent.flipped = !flipped;
  }

}
