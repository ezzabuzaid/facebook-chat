import { IModel } from './response.model';

export namespace SessionsModel {
    export interface ISession extends IModel {
        active: string;
        user_id: string;
        device_uuid: string;
    }

}