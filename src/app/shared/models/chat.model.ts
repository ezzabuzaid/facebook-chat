import { IModel } from './response.model';
import { UsersModel } from './users.model';

export namespace ChatModel {
    export interface IMember extends IModel {
        isAdmin: boolean;
        user: UsersModel.IUser;
    }

    export interface IRoom extends IModel {
        folder: string;
        avatar: string;
        name: string
        single: boolean;
    }

    export interface IGroup extends IRoom {
    }

    export interface IConversation extends IRoom {
        user1: UsersModel.IUser;
        user2: UsersModel.IUser;
    }

    export class Message extends IModel {
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