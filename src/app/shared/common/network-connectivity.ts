// import { merge, of, fromEvent } from 'rxjs';
// import { mapTo, share } from 'rxjs/operators';

// export const connectivity = {
//     get isOnline() {
//         try {
//             // NOTE: ssr error
//             return navigator.onLine;
//         } catch (error) {
//             return false;
//         }
//     },
//     observe: merge(
//         of(navigator.onLine),
//         fromEvent(window, 'online').pipe(mapTo(true)),
//         fromEvent(window, 'offline').pipe(mapTo(false))
//     ).pipe(share())
// };
