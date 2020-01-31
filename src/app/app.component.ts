import { Component, Inject, PLATFORM_ID, Renderer2, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { Logger } from '@core/helpers/logger';
import { NavigationEnd, ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService, ELanguage } from '@core/helpers/language';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { ServiceWorkerUtils } from '@core/helpers/service-worker/service-worker-update.service';
import { SeoService } from '@shared/services/seo/seo.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
import { switchMap } from 'rxjs/operators';
import { connectivity } from '@shared/common';
import { AppUtils } from '@core/helpers/utils';

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
    private snackbar: MatSnackBar,
    private serviceWorkerUtils: ServiceWorkerUtils,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {
    if (this.isBrowser) {
      this.languageService.populate(ELanguage.EN);
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

    this.serviceWorkerUtils.checkEveryHour(1);
    this.serviceWorkerUtils.updateAvailable
      .pipe(switchMap((update) => {
        log.debug('this.serviceWorkerUtils.updateAvailable => ', update);
        return this.snackbar.open('An update is available', 'Activate!').onAction()
      }))
      .subscribe((update) => {
        location.reload();
      });
    this.serviceWorkerUtils.updateActivated
      .subscribe((update) => {
        log.debug('this.serviceWorkerUtils.updateActivated => ', update);
        this.snackbar.open('The application has been updated');
      });

    connectivity.observe
      .subscribe(status => {
        let snackBarRef: MatSnackBarRef<any> = null;
        if (AppUtils.isFalsy(status)) {
          this.renderer.addClass(this.document.body, 'no-connection');
          snackBarRef = this.snackbar.open('No connection, please check you internet!', '', {
            duration: 1000 * 1000
          });
        } else {
          if (AppUtils.isTruthy(snackBarRef)) {
            snackBarRef.dismiss();
          }
          this.renderer.removeClass(this.document.body, 'no-connection');
        }
      });
  }

  get isBrowser() {
    return isPlatformBrowser(this.platformId);
  }

}
