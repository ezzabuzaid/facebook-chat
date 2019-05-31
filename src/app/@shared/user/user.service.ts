import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  login() {
    return this.http.get(`${environment.endpointUrl}`);
  }

  logout() {
    return this.http.get(`${environment.endpointUrl}`);
  }

}
