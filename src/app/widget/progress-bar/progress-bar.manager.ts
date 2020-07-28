import { Injectable } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, ResolveStart, Router } from '@angular/router';
import { SubjectFactory } from '@core/helpers/subject-factory';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarManager extends SubjectFactory<boolean> {

  constructor(
    private router: Router
  ) {
    super(false);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart || event instanceof ResolveStart))
      .subscribe(() => {
        this.show();
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd || event instanceof NavigationError || event instanceof NavigationCancel))
      .subscribe(() => {
        this.hide();
      });
  }

  show() {
    this.notify(true);
  }

  hide() {
    this.notify(false);
  }
}

