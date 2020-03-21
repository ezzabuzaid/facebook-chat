import { IModel } from './response.model';
import { UsersModel } from './users.model';

export namespace SessionsModel {
    export interface ISession extends IModel {
        active: boolean;
        user: UsersModel.IUser;
        device_uuid: string;
    }

}