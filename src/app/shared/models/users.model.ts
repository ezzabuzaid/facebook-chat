import { ListEntityQuery } from './response.model';

export namespace UsersModel {

    export interface IUser {
        _id: string;
        verified: boolean;
        username: string;
        email: string;
        mobile: string;
        role: number;
        createdAt: string;
        updatedAt: string;
    }

    export class SearchForUserQuery extends ListEntityQuery {
        constructor(public username: string, pageQuery: ListEntityQuery) {
            super(pageQuery);
        }
    }

}
