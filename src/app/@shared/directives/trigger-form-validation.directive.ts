import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Directive({
  selector: '[appTriggerFormValidation]'
})
export class TriggerFormValidationDirective {
  constructor(
    private renderer: Renderer2,
    private control: FormGroupDirective,
    private elRef: ElementRef<HTMLFormElement>
  ) { }

  @HostListener('submit') validate() {
    // this.control.statusChanges.subscribe((data) => { console.log(data); });
    // console.log(this.control.submitted);
    this.elRef.nativeElement.classList.add('ng-submitted');
  }

}
