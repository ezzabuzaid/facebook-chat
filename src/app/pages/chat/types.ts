import { UsersModel } from '@shared/models';

export class ChatMessage {
    constructor(
        public text: string,
        public conversation: string,
        public sender_id: string,
        public recipient_id: string
    ) { }
}
