import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[prevent-defaults]'
})
export class PreventDefaultsDirective {

    static preventDefault(event: Event) {
        // event.preventDefault();
        event.stopPropagation();
    }

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
        PreventDefaultsDirective.preventDefault(event);
    }

}
