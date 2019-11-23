import { Component, Inject, PLATFORM_ID, Renderer2, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { Logger } from '@core/helpers/logger';
import { NavigationEnd, ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService, Language } from '@core/helpers/language';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { ServiceWorkerUtils } from '@core/helpers/service-worker/service-worker-update.service';
import { SwUpdate } from '@angular/service-worker';
import { SeoService } from '@core/helpers/seo/seo.service';

declare const ga: (...args: any[]) => void;
const log = new Logger('AppComponent');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private languageService: LanguageService,
    private renderer: Renderer2,
    private seoService: SeoService,
    private serviceWorkerUtils: ServiceWorkerUtils,
    private sw: SwUpdate,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {
    if (this.isBrowser) {
      this.languageService.populate(Language.EN);
      // TODO PWA Checks if install popup should be appear
      const isIos = () => /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
      const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator['standalone']);
      if (isIos() && !isInStandaloneMode()) {
        // Popup function!!
      }
    }
    this.renderer.addClass(this.document.body, 'default-theme');
    this.seoService.populate({
      title: 'Angular Buildozer Boilerplate',
      description: 'Angular made easy',
      image: 'https://www.archer.ie/wp-content/uploads/2019/05/Angular_2.jpg',
      keywords: ['angular', 'backbone', 'ezzabuzaid', 'buildozer', 'boilerplate', 'angular starter', 'seed', 'angular seed'].join(',')
    });

    this.serviceWorkerUtils.checkEveryHour(1);
    this.sw.available.subscribe((update) => {
      log.debug('this.sw.available => ', update);
    });
    this.sw.activated.subscribe((update) => {
      log.debug('this.sw.activated => ', update);
    });
    this.serviceWorkerUtils.updateAvailable.subscribe((update) => {
      log.debug('this.serviceWorkerUtils.updateAvailable => ', update);
    });
    this.serviceWorkerUtils.updateActivated.subscribe((update) => {
      log.debug('this.serviceWorkerUtils.updateActivated => ', update);
    });

  }

  ngOnInit() {
    if (environment.production) {
      Logger.enableProductionMode();
    }

    this.router.events.forEach((event: RouterEvent) => {
      if (this.isBrowser && environment.production && event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }

  get isBrowser() {
    return isPlatformBrowser(this.platformId);
  }

}
