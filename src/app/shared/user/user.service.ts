import { Injectable } from '@angular/core';
import { TokenService } from '@core/helpers/token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private tokenService: TokenService
  ) { }

  logout() {
    this.tokenService.deleteToken();
  }

}
