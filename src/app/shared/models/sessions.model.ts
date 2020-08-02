import { BaseModel } from './response.model';
import { UsersModel } from './users.model';

export namespace SessionsModel {
    export interface ISession extends BaseModel {
        active: boolean;
        user: UsersModel.IUser;
        device_uuid: string;
    }

}
