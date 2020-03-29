import { merge, of, fromEvent } from 'rxjs';
import { mapTo, share } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';
import { NAVIGATOR } from './navigator';
import { WINDOW } from './window';
import { AppUtils } from '@core/helpers/utils';

@Injectable({
    providedIn: 'root'
})
export class Connectivity {
    constructor(
        @Inject(NAVIGATOR) private navigator: Navigator,
        @Inject(WINDOW) private window: Window,
    ) { }

    get isOnline() {
        return this.navigator.onLine;
    }

    get isOffline() {
        return AppUtils.inverse(this.navigator.onLine);
    }

    observe() {
        return merge(
            of(this.isOnline),
            fromEvent(this.window, 'online').pipe(mapTo(true)),
            fromEvent(this.window, 'offline').pipe(mapTo(false))
        )
            .pipe(share())
    }
}
