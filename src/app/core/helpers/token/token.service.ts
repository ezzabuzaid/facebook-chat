
import { Injectable } from '@angular/core';
import { LocalStorage } from '../localstorage';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Constants } from '@core/constants';
import { UserModel } from '@shared/user/user.model';

const helper = new JwtHelperService();
const TOKEN_KEY = Constants.Application.TOKEN_KEY;
const REFRESH_TOKEN_KEY = Constants.Application.REFRESH_TOKEN_KEY;

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  constructor(
    private localStorage: LocalStorage,
  ) { }

  get token() {
    return this.localStorage.get<string>(TOKEN_KEY);
  }

  set token(value: string) {
    this.localStorage.set(TOKEN_KEY, value);
  }

  get refreshToken() {
    return this.localStorage.get<string>(REFRESH_TOKEN_KEY);
  }

  set refreshToken(value: string) {
    this.localStorage.set(REFRESH_TOKEN_KEY, value);
  }

  deleteToken() {
    this.localStorage.remove(TOKEN_KEY);
  }

  get decodedToken(): UserModel.ITokenClaim {
    return this.isLogged ? helper.decodeToken(this.token) : {};
  }

  get isExpired(): boolean {
    return this.isLogged && helper.isTokenExpired(this.token);
  }

  get whenWillBeExpired() {
    return this.isLogged ? helper.getTokenExpirationDate(this.token) : Date.now();
  }

  get isLogged(): boolean {
    return !!this.token;
  }

  isAuthenticated() {
    return this.isLogged && !this.isExpired;
  }

}
