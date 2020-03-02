import { IModel } from './response.model';
import { UsersModel } from './users.model';

export namespace ChatModel {
    export interface IMember extends IModel {
        isAdmin: boolean;
        user: UsersModel.IUser;
    }
    export interface IGroup extends IModel {
        title: string;
        logo: string;
    }

    export interface ICreateGroup extends IGroup {
        members: string[];
        title: string;
        logo: string;
    }
}