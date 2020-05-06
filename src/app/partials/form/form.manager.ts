import { SubjectFactory } from '@core/helpers/subject-factory';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FormWidgetManager extends SubjectFactory<boolean> {
    constructor() {
        super();
    }
}
