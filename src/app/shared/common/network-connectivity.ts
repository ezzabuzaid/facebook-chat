import { merge, of, fromEvent } from 'rxjs';
import { mapTo, share } from 'rxjs/operators';

export const connectivity = {
    get isOnline() {
        return navigator.onLine;
    },
    observe: merge(
        of(navigator.onLine),
        fromEvent(window, 'online').pipe(mapTo(true)),
        fromEvent(window, 'offline').pipe(mapTo(false))
    ).pipe(share())
}