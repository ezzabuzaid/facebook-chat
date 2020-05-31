import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

declare const ga: any;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  public enabled: boolean;

  constructor(
    public router: Router
  ) {
    this.enabled = false;
  }

  trackPageViews(pagePath: string) {
    ga('send', { hitType: 'pageview', page: pagePath });
  }

  trackEvent<T>(event: T) {
    ga('send', 'event', event);
  }

  recordPageNavigation() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.trackPageViews(event.urlAfterRedirects);
      }
    });
  }

}
