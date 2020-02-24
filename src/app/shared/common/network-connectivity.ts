import { merge, of, fromEvent } from 'rxjs';
import { mapTo, share } from 'rxjs/operators';

export const $window = (() => {
    try {
        return window;
    } catch (error) {
        return {} as Window;
    }
})()
const $navigator = (() => {
    try {
        return window.navigator;
    } catch (error) {
        return {} as Navigator;
    }
})()


export const connectivity = {
    get isOnline() {
        try {
            // NOTE: ssr error
            return $navigator.onLine;
        } catch (error) {
            return false;
        }
    },
    observe: merge(
        of($navigator.onLine),
        fromEvent($window, 'online').pipe(mapTo(true)),
        fromEvent($window, 'offline').pipe(mapTo(false))
    ).pipe(share())
};
