import { Directive, ElementRef, HostListener, Inject } from '@angular/core';
import { FlipCardComponent } from './flip-card/flip-card.component';

@Directive({
  selector: '[appFlipCard]'
})
export class FlipCardDirective {

  constructor(
    public elRef: ElementRef,
    @Inject(FlipCardComponent) private readonly parent: FlipCardComponent
  ) { }

  @HostListener('click') filpCard() {
    const flipped = this.parent.flipped;
    this.parent.flipped = !flipped;
  }

}
