import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

declare const ga: any;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  public enabled: boolean;

  constructor(
    private location: Location,
  ) {
    this.enabled = false;
  }

  trackPageViews() {
    ga('send', { hitType: 'pageview', page: this.location.path() });
  }

  trackEvent(eventName: string) {
    ga('send', 'event', eventName);
  }

}
