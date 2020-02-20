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
import { UserService } from '@shared/user';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate, CanLoad, CanActivateChild {
  constructor(
    private router: Router,
    private userService: UserService
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
    // if (!this.userService.isAuthenticated) {
    //   this.router.navigateByUrl(Constants.Routing.LOGIN.withSlash);
    //   return true;
    // }
    return true;
  }
}
