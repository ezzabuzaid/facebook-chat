import { Component, Inject, PLATFORM_ID, Renderer2, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { Logger } from '@core/utils';
import { NavigationEnd, ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService, Language } from '@core/helpers';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
declare const ga: (...args) => void;
import { IndexDBService } from '@shared/services/indexdb.service';
import { ServiceWorkerUtils } from '@shared/services/service-worker-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private languageService: LanguageService,
    private renderer: Renderer2,
    // private seoService: SeoService,
    private indexDBService: IndexDBService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: any,
    private serviceWorkerUtils: ServiceWorkerUtils
  ) {
    if (this.isBrowser) {
      this.languageService.populate(Language.EN);
    }
    this.renderer.addClass(this.document.body, 'default-theme');
    // this.seoService.populate({
    //   title: 'Angular starter',
    //   description: 'Angular made easy',
    //   image: 'http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg',
    //   keywords: 'backbone'
    // });
    this.indexDBService.populate({ name: 'test', version: 4 })
      .onUpgrade
      .subscribe(database => {
        console.log(database);
      });
    this.serviceWorkerUtils.checkEveryHour(0.00001);
    this.serviceWorkerUtils.updateAvailable.subscribe(console.log);
    this.serviceWorkerUtils.updateActivated.subscribe(console.log);
    this.indexDBService.objectStore('testObjectStore').subscribe(console.log);
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
