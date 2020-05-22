import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenHelper } from '@core/helpers/token';
import { Constants } from '@core/constants';
import { AppUtils } from '@core/helpers/utils';
import { SubjectFactory } from '@core/helpers/subject-factory';
import { environment } from '@environments/environment';
import { NAVIGATOR, WINDOW } from '@shared/common';
import { PortalModel } from '@shared/models';

@Injectable({
  providedIn: 'root'
})
export class UserService extends SubjectFactory<boolean> {

  constructor(
    private http: HttpClient,
    private tokenService: TokenHelper,
    private router: Router,
    @Inject(NAVIGATOR) private navigator: Navigator,
    @Inject(WINDOW) private window: Window,
  ) { super(); }

  public login(payload: PortalModel.ILoginRequest) {
    return this.http
      .post<PortalModel.ILoginResponse>(Constants.API.PORTAL.login, payload)
      .pipe(
        tap(() => {
          this.notify(this.isAuthenticated);
        })
      );
  }

  register(payload: PortalModel.IRegister) {
    return this.http.post(Constants.API.USERS.base, payload);
  }

  refreshToken() {
    return this.http
      .post<PortalModel.ILoginResponse>(Constants.API.PORTAL.refreshtoken, new PortalModel.RefreshToken(
        this.getDeviceUUID(),
        this.tokenService.token,
        this.tokenService.refreshToken,
      ))
      .pipe(tap(({ refreshToken, token }) => {
        this.tokenService.setToken(token, refreshToken);
      }))
  }

  public checkIfAccountIsExist(payload: PortalModel.IRegister) {
    return this.http.post<PortalModel.AccountVerifiedResponse>(Constants.API.PORTAL.ACCOUNT_VERIFIED, payload);
  }

  public logout(redirectUrl = undefined) {
    console.log(redirectUrl);
    let blob = new Blob([JSON.stringify({})], {
      [Constants.Application.DEVICE_UUID]: this.getDeviceUUID()
    });
    this.navigator.sendBeacon(`${environment.endpointUrl}${Constants.API.PORTAL.logout}`, blob);
    this.router.navigateByUrl(Constants.Routing.LOGIN.withSlash, {
      queryParams: {
        // [Constants.Application.REDIRECT_URL]: redirectUrl || undefined,
        fuck: 'test'
      },
    });
    this.tokenService.deleteToken();
    this.notify(this.isAuthenticated);
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
