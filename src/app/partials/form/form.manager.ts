import { Injectable } from '@angular/core';
import { SubjectFactory } from '@core/helpers/subject-factory';

@Injectable({
    providedIn: 'root'
})
export class FormWidgetManager extends SubjectFactory<boolean> {
    constructor() {
        super();
    }
}
