import { BaseModel, WriteResult } from './response.model';
import { UsersModel } from './users.model';

export namespace ChatModel {
    export interface IMember extends BaseModel {
        isAdmin: boolean;
        user: UsersModel.IUser;
    }

    export class Room extends WriteResult {
        folder: string;
        avatar: string;
        name: string;
        single: boolean;
        constructor(data: Room) {
            super(data);
            Object.assign(this, data);
            console.log(data);
        }
    }

    export interface IConversation extends Room {
        user1: UsersModel.IUser;
        user2: UsersModel.IUser;
    }

    export class Message extends BaseModel {
        public timestamp = Date.now();
        user: string;
        room: string;
        text: string;
        order: number;
        rawFile: File;
        constructor(content: Partial<Message>) {
            super(content);
            this.user = content.user;
            this.room = content.room;
            this.text = content.text;
            this.order = content.order;
            this.rawFile = content.rawFile;
        }
    }
    export class VideoStream {
        constructor(
            public negotiation: RTCSessionDescriptionInit,
            public id: string
        ) { }
    }

    export class ChatOutgoingMessage {
        constructor(
            public id: string,
            public text: string,
            public order: number,
            public timestamp: number,
        ) { }
    }

}
