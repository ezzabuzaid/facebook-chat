export * from './user-card/user-card.component';
export * from './group-chat-card/group-chat-card.component';
export * from './group-chat-create/group-chat-create.component';
export * from './chat-card.module';
export * from './chat-card.manager';

export interface IChatCard<T> {
    id: string;
    data: T;
}