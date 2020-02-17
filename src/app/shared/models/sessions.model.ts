import { IModel } from './response.model';

export namespace SessionsModel {
    export interface ISession extends IModel {
        active: boolean;
        user_id: string;
        device_uuid: string;
    }

}