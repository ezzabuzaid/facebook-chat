import { Injectable } from '@angular/core';
import { PortalModel } from './portal.model';
import { FormValue } from 'app/widget/form';

@Injectable()
export class PortalService {
  constructor() { }

  login(credentials) { }

  register(user: FormValue<PortalModel.RegisterPost>) { }

}
