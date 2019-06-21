import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { DatabaseService } from '@shared/services/database/database.service';
import { PortalModel } from './portal.model';
import { FormValue } from '@widget/form';
import { Collection } from '@shared/services/database/database-collection';
import { of, throwError } from 'rxjs';
import { PortalController } from './portal.controller';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PortalService {
  constructor(
    private http: HttpClient,
    private portalController: PortalController
  ) { }

  login() {
    return this.http.get(`${environment.endpointUrl}`);
  }

  register(user: FormValue<PortalModel.RegisterPost>) {
    try {
      return of(this.portalController.create(user));
    } catch (error) {
      return throwError(error);
    }
  }

}
