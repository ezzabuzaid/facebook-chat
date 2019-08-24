import { Directive, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropDown]'
})
export class DropDownDirective {
  // TODO Consider add overlay container
  // TODO Replace backdrop injection
  listElement: HTMLElement = null;
  @Input() set semiDropDown(listElement) {
    this.listElement = listElement;
  }
  constructor(
    private renderer: Renderer2,
    // private backdrop: Backdrop
  ) { }

  @HostListener('click') openList() {
    if (this.listElement.classList.contains('show')) {
      this.renderer.removeClass(this.listElement, 'show');
      // this.backdrop.removeBackdrop();
    } else {
      // this.backdrop.addBackdrop();
      this.renderer.addClass(this.listElement, 'show');
      // this.renderer.listen(Backdrop.element, 'click', () => {
      //   this.openList();
      // });
    }
  }

}

// Don't used until refactored
// Use material one instead
