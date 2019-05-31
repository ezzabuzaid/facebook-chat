import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { first, mergeMap } from 'rxjs/operators';
import { interval, concat } from 'rxjs';
import { Logger } from '@core/utils';
const log = new Logger('ServiceWorkerUtils');
@Injectable({
  providedIn: 'root'
})
export class ServiceWorkerUtils {
  updateAvailable = this.updates.available;
  updateActivated = this.updates.activated;
  constructor(
    private updates: SwUpdate,
    private applicationRef: ApplicationRef
  ) { }

  checkEveryHour(hour = 5) {
    const $appIsStable = this.applicationRef.isStable.pipe(first(isStable => isStable === true));
    const $interval = interval(hour * 60 * 60 * 1000);
    concat($appIsStable, $interval).pipe(mergeMap(() => {
      log.debug('this.updates.checkForUpdate()');
      return this.updates.checkForUpdate();
    }));
  }

}
