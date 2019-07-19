import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorage } from '@shared/services';
import { Constants } from '@core/helpers/constants';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate {

  constructor(
    private localStorage: LocalStorage,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!!this.localStorage.get(Constants.Application.TOKEN_KEY)) {
      return true;
    }
    this.router.navigate([`/${Constants.Routing.LOGIN}`]);
  }
}
