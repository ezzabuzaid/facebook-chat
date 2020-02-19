import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersModel } from '@shared/models';
import { map } from 'rxjs/operators';
import { TokenService } from '@core/helpers/token';

@Injectable({
    providedIn: 'root'
})

export class UsersService {
    constructor(
        private http: HttpClient,
        private tokenService: TokenService
    ) { }

    public getUsers() {
        return this.http.get<UsersModel.IUser[]>('users');
    }

    public getUsersWithoutMe() {
        return this.getUsers()
            .pipe(map(list => list.filter(user => user._id !== this.tokenService.decodedToken.id)));
    }

}
