import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad,
  Route, RouterStateSnapshot,



  UrlSegment, UrlTree
} from '@angular/router';
import { Logger } from '@core/helpers/logger';
import { Observable } from 'rxjs';
import { TokenHelper } from '@core/helpers/token';
import { ApplicationUser } from '@core/application-user';
const logger = new Logger('AppGuard');
@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate, CanLoad, CanActivateChild {
  constructor(
    private tokenHelper: TokenHelper,
    private applicationUser: ApplicationUser
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authenticate(state.url);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    const path = segments.reduce((accumlator, currentSegment) => `${ accumlator }/${ currentSegment.path }`, '');
    return this.authenticate(path);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authenticate(state.url);
  }


  public authenticate(redirectUrl?) {
    if (!this.tokenHelper.isAuthenticated) {
      this.applicationUser.logout(redirectUrl);
      return false;
    }
    return true;
  }
}
