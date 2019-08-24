import { Injectable } from '@angular/core';

@Injectable()
export class Backdrop {
    public static element = null;
    private backdrop: HTMLElement = null;

    addBackdrop(appendTo = document.body) {
        this.backdrop = Backdrop.element = document.createElement('div');
        this.backdrop.classList.add('backdrop');
        appendTo.appendChild(this.backdrop);
    }

    removeBackdrop(detachFrom = document.body) {
        detachFrom.removeChild(this.backdrop);
        this.backdrop = null;
        Backdrop.element = null;
    }
}
