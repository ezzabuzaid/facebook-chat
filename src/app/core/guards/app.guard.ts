import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { UserService } from '@shared/account';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate, CanLoad, CanActivateChild {
  constructor(
    private readonly userService: UserService
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


  public authenticate(redirectUrl?: string) {
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
