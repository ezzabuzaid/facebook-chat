export namespace UserModel {
    export interface ILogin {
        _id: string;
        username: string;
        password: string;
        mobile: string;
        email: string;
        role: number;
        token: string;
        createdAt: string;
        updatedAt: string;
    }
    export interface ITokenClaim {
        role: string;
        id: string;
    }
}

