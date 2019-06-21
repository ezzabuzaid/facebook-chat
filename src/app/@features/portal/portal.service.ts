import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable()
export class PortalService {
  constructor(
    private http: HttpClient
  ) { }

  login() {
    return this.http.get(`${environment.endpointUrl}`);
  }

}
