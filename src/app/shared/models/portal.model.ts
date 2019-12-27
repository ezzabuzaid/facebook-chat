export namespace PortalModel {
    export interface ILogin {
        username: string;
        password: string;
    }

    export enum ERoles {
        SUPERADMIN,
        ADMIN,
        CLIENT,
        CUSTOMER,
    }
    export interface IRegister {
        role: ERoles;
        password: string;
        mobile: string;
        username: string;
        email: string;
    }

}
