import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceWorkerUtils {
  updateAvailable = this.updates.available;
  updateActivated = this.updates.activated;
  constructor(
    private readonly updates: SwUpdate,
    private readonly applicationRef: ApplicationRef
  ) { }

  checkEveryHour(hour = 5) {
    const time = hour * 60 * 60 * 1000;
    return this.applicationRef.isStable
      .pipe(
        first(isStable => isStable === true),
        switchMap(() => interval(time)),
        switchMap(() => this.updates.checkForUpdate())
      );
  }

}
