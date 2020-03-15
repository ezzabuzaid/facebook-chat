import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from '@core/helpers/token';
import { Constants } from '@core/constants';
import { UserModel } from './user.model';
import { AppUtils } from '@core/helpers/utils';
import { Listener } from '@core/helpers/listener';
import { environment } from '@environments/environment';

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
      .post<{ refreshToken: string; token: string; }>(Constants.API.PORTAL.login, payload)
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

  refreshToken() {
    // TODO: Implement refresh token
  }

  public logout() {
    navigator.sendBeacon(`${environment.endpointUrl}${Constants.API.PORTAL.logout}/${this.getDeviceUUID()}`);
    this.router.navigateByUrl(Constants.Routing.LOGIN.withSlash);
    this.tokenService.deleteToken();
    this.state.next(this.isAuthenticated);
  }

  public get isAuthenticated() {
    return this.tokenService.isLogged && AppUtils.isFalsy(this.tokenService.isExpired);
  }

  getDeviceUUID() {
    let guid = navigator.mimeTypes.length as any;
    guid += navigator.userAgent.replace(/\D+/g, '');
    guid += navigator.plugins.length;
    guid += screen.height || '';
    guid += screen.width || '';
    guid += screen.pixelDepth || '';
    return guid;
  }

  oneTimeLogin() {
    return this.tokenService.oneTimeLogin;
  }

}
