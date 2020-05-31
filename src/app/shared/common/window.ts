import { inject, InjectionToken } from '@angular/core';
import { NAVIGATOR } from './navigator';

export const WINDOW = new InjectionToken<Window>('WINDOW', {
    factory: (): Window => {
        try {
            return window;
        } catch (error) {
            return {
                screen: {
                    height: 1
                },
                innerWidth: 1,
                devicePixelRatio: 1,
                navigator: inject(NAVIGATOR)
            } as Window;
        }
    },
    providedIn: 'root',
});
