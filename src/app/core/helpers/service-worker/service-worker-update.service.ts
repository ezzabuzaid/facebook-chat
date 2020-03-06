import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { first, mergeMap, tap, concatMap, switchMap } from 'rxjs/operators';
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
    const time = hour * 60 * 60 * 1000;
    return this.applicationRef.isStable
      .pipe(
        first(isStable => isStable === true),
        tap((stable) => log.debug('$appIsStable => ', stable)),
        switchMap(() => interval(time)),
        switchMap(() => this.updates.checkForUpdate())
      );
  }

}
