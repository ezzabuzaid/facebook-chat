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

  private get storage() {
    return AppUtils.isNullorUndefined(this.session.get(TOKEN_KEY)) ? this.local : this.session;
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

  setToken(rememberMe: boolean, token: string, refreshToken: any) {
    if (AppUtils.isFalsy(rememberMe)) {
      // NOTE: this way we can tell that the storage is session
      this.session.set(TOKEN_KEY, 'token');
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
