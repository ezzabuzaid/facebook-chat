import { inject, InjectionToken } from '@angular/core';
import { TokenHelper } from '@core/helpers/token';
import { environment } from '@environments/environment';
import * as io from 'socket.io-client';

export const SOCKET_IO = new InjectionToken('SOCKET_IO', {
    providedIn: 'root', factory: () => {
        const tokenHelper = inject(TokenHelper);
        return io(environment.serverOrigin, {
            query: { token: tokenHelper.token },
            transports: ['websocket']
        });
    }
});
