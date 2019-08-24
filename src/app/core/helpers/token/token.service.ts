import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Constants } from '@core/constants';
import { LocalStorage } from '../localstorage';

const helper = new JwtHelperService();
const TOKEN_KEY = Constants.Application.TOKEN_KEY;

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  constructor(
    private localStorage: LocalStorage,
  ) { }

  /**
   *
   * encoded token, that was saved before in localstorage
   */
  get token() {
    return this.localStorage.get(TOKEN_KEY);
  }
  /**
   * @param value
   * use this method to directly set the token in localsorage
   */
  set token(value: string) {
    this.localStorage.set(TOKEN_KEY, value);
  }

  /**
   *
   * remove the token from storage
   */
  deleteToken() {
    this.localStorage.remove(TOKEN_KEY);
  }

  get decodedToken() {
    return this.isLogged ? helper.decodeToken(this.token) : {};
  }

  /**
   * @returns the token has been expired or not ! ~~ this method return boolean to check weather is the time has been eleminte
   * usually this method used when request something from the server that serve the application (the server that has maintained the token)
   * to ensure that the person will be kicked off.
   * the method return only if the person is logged otherwise it will return true, this mean get raid of him
   */

  isExpired(): boolean {
    return this.isLogged && helper.isTokenExpired(this.token);
  }

  // isAdmin(): boolean {
  //   return this.isLogged && this.decodedToken.role === 'admin';
  // }

  // isSuperAdmin(): boolean {
  //   return this.isLogged && this.decodedToken.role === 'superadmin';
  // }

  // isAllowed() {
  //   return this.isSuperAdmin() || this.isAdmin();
  // }

  whenWillBeExpired() {
    return this.isLogged ? helper.getTokenExpirationDate(this.token) : Date.now();
  }

  get isLogged(): boolean {
    return !!this.token;
  }

  isAuthenticated() {
    return this.isLogged && !this.isExpired();
  }

}


/*
  Author:: ezzabuzaid
  Email:: ezzabuzaid@hotmail.com
  this service is a utility for a jwt token
  it's provided in root, perhaps you will inject it in many component
  to provide a certain function depends on your need
*/
