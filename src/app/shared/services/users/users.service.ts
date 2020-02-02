import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersModel } from '@shared/models';

@Injectable({
    providedIn: 'root'
})

export class UsersService {
    constructor(
        private http: HttpClient
    ) { }

    public getUsers() {
        return this.http.get<UsersModel.IUser[]>('users');
    }

}
