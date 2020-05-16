export namespace PortalModel {
    export enum ERoles {
        SUPERADMIN = 1,
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
    export interface IProfile {
        firstName: string;
        lastName: string;
        country: string;
        city: string;
        nationality: string;
        placeOfBirth: string;
        dateOfBrith: Date;
        gender: string;
        occupation: string;
    }
    export interface IForgotPassword {
        firstName: string;
        lastName: string;
        placeOfBirth: string;
        dateOfBrith: Date;
        email: string;
    }
    export interface ILoginRequest {
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
