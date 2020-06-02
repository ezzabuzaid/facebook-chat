import { isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Injector, NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CoreModule } from '@core/core.module';
import { LanguageLoader } from '@core/helpers/language';
import { LocalStorage, SessionStorage } from '@ezzabuzaid/document-storage';
import { RequestOptionsModule } from '@ezzabuzaid/ngx-request-options';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { IRequestOptions } from '@shared/common';
import { PopupModule } from '@widget/popup';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StaticPagesModule } from './pages/static/static-pages.module';

export const localStorageFactory = (injector: Injector) => {
  if (isPlatformBrowser(injector.get(PLATFORM_ID))) {
    return new LocalStorage('buildozer');
  }
  return {
    get(param: string) { },
  } as Partial<LocalStorage>;
};

export const sessionStorageFactory = (injector: Injector) => {
  if (isPlatformBrowser(injector.get(PLATFORM_ID))) {
    return new SessionStorage('buildozer');
  }
  return {
    get(param: string) { },
  } as Partial<SessionStorage>;
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    CoreModule,
    PopupModule,
    StaticPagesModule,
    RequestOptionsModule.forRoot<IRequestOptions>({
      DEFAULT_URL: true,
      SNACKBAR: false,
      PROGRESS_BAR: true,
      FORM_PROGRESS_BAR: true,
      FULL_RESPONSE: true,
      LOCAL_CACHE: false,
      CACHE_CATEGORY: 'local_cache'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: LanguageLoader
      }
    })
  ],
  providers: [
    {
      provide: LocalStorage,
      useFactory: localStorageFactory,
      deps: [Injector]
    },
    {
      provide: SessionStorage,
      useFactory: sessionStorageFactory,
      deps: [Injector]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

declare module '@angular/common/http/http' {
  // Augment HttpClient with the added `configure` method
  export interface HttpClient {
    /**
     * Configure request options.
     */
    configure(options: Partial<IRequestOptions>): HttpClient;
  }
}
