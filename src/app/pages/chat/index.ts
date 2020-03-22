export * from './chat-group-card/chat-group-card.component';
export * from './group-chat-create/group-chat-create.component';
export * from './chat.module';
export * from './chat-card.manager';
export * from './chat.manager';

export interface IChatCard<T> {
    id: string;
    data: T;
}