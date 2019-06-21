import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { first, mergeMap, tap } from 'rxjs/operators';
import { interval, concat } from 'rxjs';
import { Logger } from '@core/helpers/logger';

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
    const $appIsStable = this.applicationRef.isStable
      .pipe(
        first(isStable => isStable === true),
        tap((stable) => log.debug('$appIsStable => ', stable))
      );
    const $interval = interval(hour * 60 * 60 * 1000);
    log.debug('will check every', hour * 60 * 60 * 1000);
    concat($appIsStable, $interval).pipe(mergeMap((data) => {
      log.debug('this.updates.checkForUpdate => ', data);
      return this.updates.checkForUpdate();
    }));
  }

}
