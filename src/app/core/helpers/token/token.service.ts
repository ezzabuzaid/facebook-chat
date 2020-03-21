import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Constants } from '@core/constants';
import { UserModel } from '@shared/user/user.model';
import { LocalStorage, SessionStorage } from '@ezzabuzaid/document-storage';
import { AppUtils } from '../utils';

const helper = new JwtHelperService();
const TOKEN_KEY = Constants.Application.TOKEN_KEY;
const REFRESH_TOKEN_KEY = Constants.Application.REFRESH_TOKEN_KEY;

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  oneTimeLogin = false;
  private get storage() {
    return this.oneTimeLogin ? this.session : this.local;
  }

  constructor(
    private local: LocalStorage,
    private session: SessionStorage,
  ) { }

  get token() {
    return this.storage.get<string>(TOKEN_KEY);
  }

  get refreshToken() {
    return this.storage.get<string>(REFRESH_TOKEN_KEY);
  }

  setToken(rememberMe: boolean, token: string, refreshToken: string) {
    if (AppUtils.isFalsy(rememberMe)) {
      this.oneTimeLogin = true;
    }
    this.storage.set(REFRESH_TOKEN_KEY, refreshToken);
    this.storage.set(TOKEN_KEY, token);
  }

  deleteToken() {
    this.storage.delete(TOKEN_KEY);
    this.storage.delete(REFRESH_TOKEN_KEY);
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
    return AppUtils.isFalsy(AppUtils.isNullorUndefined(this.token));
  }


}
