import { IModel } from '@shared/models';

export class ChatMessage {
    constructor(
        public text: string,
        public conversation: string,
        public sender_id: string,
        public recipient_id: string
    ) { }
}

export class ChatLocalMessage<T = string> extends IModel {
    constructor(
        public text: T,
        public conversation: string,
        public sender_id: string,
        public recipient_id: string
    ) {
        super();
    }
}
