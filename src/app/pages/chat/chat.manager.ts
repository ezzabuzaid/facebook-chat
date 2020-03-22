import * as io from 'socket.io-client';
import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ChatManager {
    public socket = io(environment.serverOrigin);

}