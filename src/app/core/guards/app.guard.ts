import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route,
  CanActivateChild,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from '../constants';
import { TokenService } from '@core/helpers/token';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate, CanLoad, CanActivateChild {
  constructor(
    private router: Router,
    private tokenService: TokenService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authenticate();
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.authenticate();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authenticate();
  }


  private authenticate() {
    if (!this.tokenService.isAuthenticated()) {
      this.router.navigateByUrl(Constants.Routing.LOGIN.withSlash);
      return false;
    }
    return true;
  }
}
