import { Component, Inject, PLATFORM_ID, Renderer2, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { Logger } from '@core/helpers/logger';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService, ELanguage } from '@core/helpers/language';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { ServiceWorkerUtils } from '@core/helpers/service-worker/service-worker-update.service';
import { SeoService } from '@shared/services/seo/seo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, tap } from 'rxjs/operators';
import { AppUtils } from '@core/helpers/utils';
import { Connectivity, NAVIGATOR } from '@shared/common';
import { AnalyticsService } from '@shared/services/analytics';
import { UserService } from '@shared/user';
import { partition } from 'rxjs';

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
    @Inject(NAVIGATOR) private navigator: Navigator,
    private analyticService: AnalyticsService,
    private userService: UserService,
    private connectivity: Connectivity
  ) {

    // STUB if requestSubscription reject the subscribeToPushNotification result must be false
    // STUB if requestSubscription reject the pushNotificationService.subscribe must not be called

    // STUB if requestSubscription success the subscribeToPushNotification result must be true
    // STUB if requestSubscription success the pushNotificationService.subscribe must be called

    // const subscribeToPushNotification = () => from(this.serviceWorkerPushService
    // .requestSubscription({ serverPublicKey: environment.vapidPublicKey }))
    //     .pipe(
    //         tap((subscription) => {
    //             console.log('Subscription => ', subscription);
    //         }),
    //         switchMap((subscription) => this.pushNotificationService.subscribe(subscription)),
    //         mapTo(true),
    //         catchError(() => of(false)),
    //     );

    // STUB if requestSubscription reject the subscribeToPushNotification result must be false
    // STUB if requestSubscription reject the pushNotificationService.subscribe must not be called

    // STUB if requestSubscription success the subscribeToPushNotification result must be true
    // STUB if requestSubscription success the pushNotificationService.subscribe must be called

    // this.serviceWorkerPushService.subscription
    //     .pipe(
    //         takeUntil(this._unsubscribeAll),
    //         switchMap((subscription) => {
    //             console.log('Subscription => ', subscription);
    //             return tryOrComplete<any>(
    //                 AppplicationUtils.isNullorUndefined(subscription),
    //                 () => subscribeToPushNotification(),
    //                 true
    //             );
    //         }),
    //         tap((notificationEnabled) => console.log('notificationEnabled', notificationEnabled)),
    //         filter((notificationEnabled) => notificationEnabled),
    //         switchMap(() => this.serviceWorkerPushService.messages)
    //     )
    //     .subscribe((message) => {
    //         console.log('Message from SWpush => ', message);
    //         // the service worker should focus the opened if it was in foreground
    //         // after that sh
    //     });

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

    if (this.isBrowser && environment.production) {
      this.analyticService.recordPageNavigation();

      window.addEventListener('unload', (event) => {
        if (this.userService.oneTimeLogin()) {
          this.userService.logout();
          return "";
        }
      });


      this.serviceWorkerUtils.checkEveryHour(0.001).subscribe();
      this.serviceWorkerUtils.updateAvailable
        .pipe(switchMap(() => this.snackbar.open('An update is available', 'Activate!').onAction()))
        .subscribe(() => {
          location.reload();
        });
      this.serviceWorkerUtils.updateActivated
        .subscribe((updte) => {
          this.snackbar.open('The application has been updated');
        });
    }

    if (this.isBrowser) {

      this.languageService.populate(ELanguage.EN);

      // TODO PWA Checks if install popup should be appear
      const isIos = () => /iphone|ipad|ipod/.test(this.navigator.userAgent.toLowerCase());
      const isInStandaloneMode = () => ('standalone' in this.navigator) && (this.navigator['standalone']);
      if (isIos() && !isInStandaloneMode()) {
        // Popup function!!
      }

      const [$offline, $online] = partition(this.connectivity.observe(), AppUtils.isFalsy);
      const noConnectionClass = 'no-connection';
      const affectedElement = this.document.body;
      $online.subscribe(() => {
        this.snackbar.dismiss();
        this.renderer.removeClass(affectedElement, noConnectionClass);
      })
      $offline.pipe(
        switchMap(() => {
          this.renderer.addClass(affectedElement, noConnectionClass);
          return this.snackbar.open(
            'No connection, please check you internet!',
            'Refresh!',
            { duration: 1000 * 1000 })
            .onAction();
        }),
        tap(() => location.reload())
      )
        .subscribe()
    }

  }

  get isBrowser() {
    return isPlatformBrowser(this.platformId);
  }

}

// class UserSettings implements AsyncStorage {

//   get<T>(name: string): Promise<Entity<T>> {
//     return fetch(`settings/${name}`)
//       .then(res => res.json());
//   }

//   clear(name?: string): Promise<void> {
//     return fetch(`settings/${name}`, {
//       method: 'POST',
//       body: JSON.stringify([])
//     }).then(res => res.json());
//   }

//   set<T>(name: string, value: Entity<T>[]): Promise<Entity<T>> {
//     return fetch(`settings/${name}`, {
//       method: 'POST',
//       body: JSON.stringify(value)
//     }).then(res => res.json());
//   }

// }

// interface Table {
//   columns: []
// }

// const db = new AsyncDatabase(new UserSettings());

// const collection = db.collection<Table>('users.tables');
