import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from '@core/helpers/token';
import { Constants } from '@core/constants';
import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private state = new BehaviorSubject(this.isAuthenticated);
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router,
  ) { }


  public login(payload) {
    return this.http.post<UserModel.ILogin>('portal/login', payload)
      .pipe(
        tap(data => {
          this.tokenService.token = data.token;
          this.state.next(this.isAuthenticated);
        })
      );
  }

  // TODO: Update the type after switch from default form to new crud like style
  register(payload) {
    return this.http.post<UserModel.ILogin>('users', payload);
  }

  public logout() {
    this.state.next(this.isAuthenticated);
    this.tokenService.deleteToken();
    this.router.navigateByUrl(Constants.Routing.LOGIN.withSlash);
  }

  public get isAuthenticated() {
    return this.tokenService.isAuthenticated();
  }

  public stateChanged() {
    return this.state.asObservable();
  }

}
