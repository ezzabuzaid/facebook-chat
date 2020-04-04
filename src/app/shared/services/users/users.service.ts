import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersModel, ListEntityResponse } from '@shared/models';
import { map } from 'rxjs/operators';
import { TokenService } from '@core/helpers/token';
import { Constants } from '@core/constants';

@Injectable({
    providedIn: 'root'
})

export class UsersService {
    constructor(
        private http: HttpClient,
        private tokenService: TokenService
    ) { }

    public getUsers() {
        return this.http.get<ListEntityResponse<UsersModel.IUser>>(Constants.API.USERS.base)
            .pipe(map(({ list }) => list));
    }

    public searchForUsers(name: string) {
        return this.http.get<UsersModel.IUser[]>(`${Constants.API.USERS.search}?username=${name}`);
    }

    public getUsersWithoutMe() {
        return this.getUsers()
            .pipe(map(list => list.filter(user => user._id !== this.tokenService.decodedToken.id)));
    }

    public getCurrentUser() {
        return this.http.get<UsersModel.IUser>(`${Constants.API.USERS.base}/${this.tokenService.decodedToken.id}`)
    }

}

