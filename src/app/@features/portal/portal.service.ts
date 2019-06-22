import { Injectable } from '@angular/core';
import { PortalModel } from './portal.model';
import { FormValue } from '@widget/form';
import { PortalController } from './portal.controller';
import { tryOrThrow } from '@core/helpers';

@Injectable()
export class PortalService {
  constructor(
    private portalController: PortalController<FormValue<PortalModel.RegisterPost>>
  ) { }

  login(credentials) {
    return tryOrThrow(() => this.portalController.login(credentials));
  }

  register(user: FormValue<PortalModel.RegisterPost>) {
    return tryOrThrow(() => this.portalController.create(user));
  }

}
