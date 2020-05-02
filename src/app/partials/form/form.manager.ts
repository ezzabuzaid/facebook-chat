import { SubjectFactory } from '@core/helpers/listener';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FormWidgetManager extends SubjectFactory<boolean> {
    constructor() {
        super();
    }
}
