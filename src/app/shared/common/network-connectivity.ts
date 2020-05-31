import { Inject, Injectable } from '@angular/core';
import { AppUtils } from '@core/helpers/utils';
import { fromEvent, merge, of } from 'rxjs';
import { mapTo, share } from 'rxjs/operators';
import { NAVIGATOR } from './navigator';
import { WINDOW } from './window';

@Injectable({
    providedIn: 'root'
})
export class Connectivity {

    get isOnline() {
        return this.navigator.onLine;
    }

    get isOffline() {
        return AppUtils.inverse(this.navigator.onLine);
    }
    constructor(
        @Inject(NAVIGATOR) private readonly navigator: Navigator,
        @Inject(WINDOW) private readonly window: Window,
    ) { }

    observe() {
        return merge(
            of(this.isOnline),
            fromEvent(this.window, 'online').pipe(mapTo(true)),
            fromEvent(this.window, 'offline').pipe(mapTo(false))
        )
            .pipe(share())
    }
}
