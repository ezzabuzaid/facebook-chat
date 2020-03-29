export namespace PortalModel {
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
    export interface LoginRequest {
        username: string;
        password: string;
    }

    export interface ITokenClaim {
        role: string;
        id: string;
    }
    export class RefreshToken {
        constructor(
            public uuid: string,
            public token: string,
            public refreshToken: string,
        ) { }
    }


    export interface ILoginResponse {
        refreshToken: string;
        token: string;
    }
}
