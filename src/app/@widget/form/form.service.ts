import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FormWidgetService {
    private _progressBar = new BehaviorSubject<boolean>(false);
    constructor() { }

    get castProgressBar() {
        return this._progressBar.asObservable();
    }

    set progressBar(value: boolean) {
        this._progressBar.next(value);
    }
}
