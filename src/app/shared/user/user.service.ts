import { Injectable } from '@angular/core';
import { TokenService } from '@core/helpers/token';
import { Constants } from '@core/constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  logout() {
    this.router.navigateByUrl(Constants.Routing.LOGIN.withSlash);
    this.tokenService.deleteToken();
  }

}
