import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenService } from '@core/helpers/token';
import { Constants } from '@core/constants';
import { AppUtils } from '@core/helpers/utils';
import { Listener } from '@core/helpers/listener';
import { environment } from '@environments/environment';
import { NAVIGATOR, WINDOW } from '@shared/common';

@Injectable({
  providedIn: 'root'
})
export class UserService extends Listener<boolean> {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router,
    @Inject(NAVIGATOR) private navigator: Navigator,
    @Inject(WINDOW) private window: Window,
  ) { super(); }

  public login(payload) {
    return this.http
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
    this.navigator.sendBeacon(`${environment.endpointUrl}${Constants.API.PORTAL.logout}/${this.getDeviceUUID()}`);
    this.router.navigateByUrl(Constants.Routing.LOGIN.withSlash);
    this.tokenService.deleteToken();
    this.state.next(this.isAuthenticated);
  }

  public get isAuthenticated() {
    return this.tokenService.isLogged && AppUtils.isFalsy(this.tokenService.isExpired);
  }

  getDeviceUUID() {
    let guid = this.navigator.mimeTypes.length as any;
    guid += this.navigator.userAgent.replace(/\D+/g, '');
    guid += this.navigator.plugins.length;
    guid += this.window.screen.height || '';
    guid += this.window.innerWidth || '';
    guid += this.window.devicePixelRatio || '';
    return guid;
  }

  oneTimeLogin() {
    return this.tokenService.oneTimeLogin;
  }

}
