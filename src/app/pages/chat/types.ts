import { IModel } from '@shared/models';

export class ChatMessage {
    constructor(
        public text: string,
        public id: string,
    ) { }
}

export class ChatLocalMessage<T = string> extends IModel {
    constructor(
        public text: T,
        public id: string,
        public user: string
    ) {
        super();
    }
}
