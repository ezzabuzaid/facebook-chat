import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ApplicationUser } from '@core/application-user';
import { ELanguage, LanguageService } from '@core/helpers/language';
import { Logger } from '@core/helpers/logger';
import { ServiceWorkerUtils } from '@core/helpers/service-worker/service-worker-update.service';
import { TokenHelper } from '@core/helpers/token';
import { AppUtils } from '@core/helpers/utils';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { Connectivity, NAVIGATOR, SOCKET_IO } from '@shared/common';
import { AnalyticsService } from '@shared/services/analytics';
import { SeoService } from '@shared/services/seo/seo.service';
import { partition } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ChatManager } from './pages/chat';
import { ChatModel } from '@shared/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    private readonly languageService: LanguageService,
    private readonly renderer: Renderer2,
    private readonly seoService: SeoService,
    private readonly snackbar: MatSnackBar,
    private readonly serviceWorkerUtils: ServiceWorkerUtils,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) private readonly platformId: any,
    @Inject(NAVIGATOR) private readonly navigator: Navigator,
    private readonly analyticService: AnalyticsService,
    private readonly connectivity: Connectivity,
    private readonly applicationUser: ApplicationUser,
    private readonly tokenHelper: TokenHelper,
    private translateService: TranslateService,
    @Inject(SOCKET_IO) public readonly socket: SocketIOClient.Socket
  ) {
    if (tokenHelper.isAuthenticated) {
      this.socket.emit('Join', { id: this.tokenHelper.decodedToken.id })
      this.socket.on('Message', (message: ChatModel.Message) => {
        this.snackbar.open(message.text);
      });
    }

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
      title: this.translateService.instant('application_name'),
      description: 'Angular made easy',
      image: 'https://www.archer.ie/wp-content/uploads/2019/05/Angular_2.jpg',
      keywords: ['angular', 'ezzabuzaid', 'buildozer', 'boilerplate', 'angular starter', 'seed', 'angular seed'].join(',')
    });

  }

  ngOnInit() {
    if (environment.production) {
      Logger.enableProductionMode();
    }


    if (this.isBrowser && environment.production) {
      this.analyticService.recordPageNavigation();

      this.serviceWorkerUtils.checkEveryHour(0.001).subscribe();
      this.serviceWorkerUtils.updateAvailable
        .pipe(switchMap(() => this.snackbar.open('An update is available', 'Activate!').onAction()))
        .subscribe(() => {
          location.reload();
        });
      this.serviceWorkerUtils.updateActivated
        .subscribe((updte) => {
          this.snackbar.open('The application has been updated', 'Close');
        });
    }

    if (this.isBrowser) {
      this.languageService.populate(ELanguage.EN);

      this.applicationUser.listen()
        .pipe(filter(() => this.tokenHelper.isLogged))
        .subscribe(() => {
          if (AppUtils.not(this.tokenHelper.decodedToken.verified)) {
            this.snackbar.open('Please verify your account', 'Send Email', { duration: Number.MAX_VALUE })
              .onAction()
              .pipe(switchMap(() => this.applicationUser.sendVerificationEmail()))
              .subscribe();
          }
        });

      // TODO PWA Checks if install popup should be appear
      const isIos = () => /iphone|ipad|ipod/.test(this.navigator.userAgent.toLowerCase());
      const isInStandaloneMode = () => ('standalone' in this.navigator) && (this.navigator['standalone']);
      if (isIos() && !isInStandaloneMode()) {
        // Popup function!!
      }

      const [$offline, $online] = partition(this.connectivity.observe(), AppUtils.isFalsy);
      const noConnectionClass = 'backdrop';
      const affectedElement = this.document.body;
      let noInternetConnectionSnackbar: MatSnackBarRef<any> = null;
      $online.subscribe(() => {
        noInternetConnectionSnackbar?.dismiss();
        this.renderer.removeClass(affectedElement, noConnectionClass);
      });
      $offline.pipe(
        switchMap(() => {
          this.renderer.addClass(affectedElement, noConnectionClass);
          noInternetConnectionSnackbar = this.snackbar.open(
            'No connection, please check you internet!',
            'Refresh!',
            { duration: 1000 * 1000 });
          return noInternetConnectionSnackbar.onAction();
        }),
        tap(() => location.reload())
      )
        .subscribe();
    }

  }

  get isBrowser() {
    return isPlatformBrowser(this.platformId);
  }

  @HostListener('window:unload')
  @HostListener('window:beforeunload')
  ngOnDestroy() {
    if (this.applicationUser.oneTimeLogin()) {
      this.applicationUser.logout();
    }
    return '';
  }

}

