export namespace ChatModel {
    export interface IGroup {
        _id: string;
        title: string;
        logo: string;
    }

    export interface ICreateGroup extends IGroup {
        members: string[];
        title: string;
        logo: string;
    }
}