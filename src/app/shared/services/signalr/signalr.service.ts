// import { environment } from 'environments/environment';
// import { fromEventPattern, from, iif, of, Observable } from 'rxjs';
// // import * as signalR from '@aspnet/signalr';
// import { TokenService } from '@core/helpers/token';

// @Injectable({
//     providedIn: 'root'
// })
// export class SignalRService {
//     private _hubConnection: signalR.HubConnection;
//     public onMessage: Observable<any> = null;
//     constructor(
//         private tokenService: TokenService
//     ) { }

//     connectToSignalR() {
//         // this._hubConnection = new signalR.HubConnectionBuilder()
//         //     .withUrl(environment.signalRChat + 'chat', {
//         //         accessTokenFactory: () => this.tokenService.token,
//         //         transport: signalR.HttpTransportType.LongPolling
//         //     })
//         //     .configureLogging(signalR.LogLevel.Information)
//         //     .build();
//         // this.onMessage = fromEventPattern<any>(
//         //     handler => this._hubConnection.on('MessageReceived', handler),
//         //     handler => this._hubConnection.off('MessageReceived', handler)
//         // );
//     }

//     get hubConnection() {
//         return this._hubConnection;
//     }

//     sendMessage(message: any) {
//         return from(this._hubConnection.invoke('SendMessage', message));
//     }

//     joinConversation(conversationId: string) {
//         return from(this._hubConnection.invoke('JoinChatGroup', conversationId));
//     }

//     openConnection() {
//         if (this.hubConnection.state === signalR.HubConnectionState.Disconnected) {
//             return from(this._hubConnection.start());
//         }
//         return of(null);
//     }

//     disposeConnection() {
//         if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
//             return from(this._hubConnection.stop());
//         }
//         return of(null);
//     }

// }
