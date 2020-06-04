import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '@core/constants';
import { TokenHelper } from '@core/helpers/token';
import { ListEntityQuery, ListEntityResponse, PlainQuery, UsersModel } from '@shared/models';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class UsersService {
    constructor(
        private readonly http: HttpClient,
        private readonly tokenService: TokenHelper
    ) { }

    public getUsers(query: ListEntityQuery) {
        const plainQuery = new PlainQuery(query);
        return this.http.get<ListEntityResponse<UsersModel.IUser>>(`${ Constants.API.USERS.base }?${ plainQuery.asString }`);
    }

    public searchForUsers(username: string) {
        const plainQuery = new PlainQuery<UsersModel.SearchForUserQuery>({ username, page: 0, size: 20 });
        return this.http.get<ListEntityResponse<UsersModel.IUser>>(`${ Constants.API.USERS.search }?${ plainQuery.asString }`)
            .pipe(map(({ list }) => list));
    }


    public getCurrentUser() {
        return this.http.get<UsersModel.IUser>(`${ Constants.API.USERS.base }/${ this.tokenService.decodedToken.id }`)
    }

}

