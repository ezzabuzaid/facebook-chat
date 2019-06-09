import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApplicationConstants } from './helpers.service';
import { LocalStorage } from './localstorage/localstorage.service';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  constructor(
    private localStorage: LocalStorage
  ) { }
  /**
   *
   * encoded token, that was saved before in localstorage
   */
  get token() {
    return this.localStorage.get<string>(ApplicationConstants.TOKEN_KEY);
  }
  /**
   *
   * @param value token value
   * use this method to directly set the token in localsorage
   */
  set token(value: string) {
    this.localStorage.set(ApplicationConstants.TOKEN_KEY, value);
  }

  /**
   *
   * remove the token from storage
   */
  deleteToken() {
    this.localStorage.remove(ApplicationConstants.TOKEN_KEY);
  }
  /**
   *
   */
  get decodedToken(): DecodedTokenInterface {
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

  isAdmin(): boolean {
    return this.isLogged && this.decodedToken.role === 'admin';
  }

  isSuperAdmin(): boolean {
    return this.isLogged && this.decodedToken.role === 'superadmin';
  }

  whenWillBeExpired() {
    return this.isLogged ? helper.getTokenExpirationDate(this.token) : Date.now();
  }

  isLogged(): boolean {
    return !!this.token;
  }

  isAllowed() {
    return this.isSuperAdmin() || this.isAdmin();
  }

  /*
    the below three method setup for project that has a diffrent type of role
    like admin and client
    there's an interface below demonstrate who am setup my backend
    i have a list of role and the first element for web application
    each element in that list has an authority key that specify the type (role) of person
    i think that this used when you have a certin features to specifc type (plan maybe)
  */

}

interface DecodedTokenInterface {
  role: string;
  iat: number;
  id: string;
}
/*
  Author:: ezzabuzaid
  Email:: ezzabuzaid@hotmail.com
  this service is a utility for a jwt token
  it's provided in root, perhaps you will inject it in many component
  to provide a certain function depends on your need
*/
