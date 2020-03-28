import { InjectionToken } from '@angular/core';

export const NAVIGATOR: InjectionToken<Navigator> = new InjectionToken('NAVIGATOR', {
    factory: (): Navigator => {
        try {
            return navigator;
        } catch (error) {
            return {
                mimeTypes: { length: 0 },
                userAgent: '',
                plugins: { length: 0 },
                onLine: false
            } as Navigator;
        }
    },
    providedIn: 'root',
});
