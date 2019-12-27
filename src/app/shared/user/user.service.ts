import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenService } from '@core/helpers/token';
import { Constants } from '@core/constants';
import { UserModel } from './user.model';
import { AppUtils } from '@core/helpers/utils';
import { Listener } from '@core/helpers/listener';
import { ResponseModel } from '@shared/models';

@Injectable({
  providedIn: 'root'
})
export class UserService extends Listener<boolean> {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router,
  ) { super(); }

  public login(payload) {
    return this.http
      .configure({ FULL_RESPONSE: true })
      .post<{ refreshToken: string; token: string; }>(Constants.API.LOGIN, payload)
      .pipe(
        tap((data) => {
          this.notify(this.isAuthenticated);
        })
      );
  }

  // TODO: Update the type after switch from default form to new crud like style
  register(payload) {
    return this.http.post('users', payload);
  }

  public logout() {
    this.state.next(this.isAuthenticated);
    this.tokenService.deleteToken();
    this.router.navigateByUrl(Constants.Routing.LOGIN.withSlash);
  }

  public get isAuthenticated() {
    return this.tokenService.isLogged && AppUtils.not(this.tokenService.isExpired);
  }

}
