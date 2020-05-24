import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  Route,
  CanActivateChild,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '@shared/account';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate, CanLoad, CanActivateChild {
  constructor (
    private userService: UserService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authenticate(state.url);
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.authenticate();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authenticate(state.url);
  }


  public authenticate(redirectUrl: string = undefined) {
    if (!this.userService.isAuthenticated) {
      this.userService.logout(redirectUrl);
      return false;
    }
    return true;
  }

  // private authenticate(redirectUrl = undefined) {
  // if (!this.userService.isAuthenticated) {
  //   this.router.navigate([RoutesConstants.LOGIN.withSlash], {
  //     queryParams: { [ApplicationConstants.REDIRECT_URL]: redirectUrl || undefined }
  //   });
  //   return false;
  // }
  // return true;
  // }

}
