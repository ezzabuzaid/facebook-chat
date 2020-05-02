import { Listener } from '@core/helpers/listener';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FormWidgetManager extends Listener<boolean> {
    constructor() {
        super();
    }
}
