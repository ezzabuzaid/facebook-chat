import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { LayoutModule } from '@layout/layout.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { LanguageLoader } from '@core/helpers/language';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpService } from '@core/http';
import { LocalStorage, SessionStorage } from '@ezzabuzaid/document-storage';
import { StaticPagesModule } from './pages/static/static-pages.module';
import { PopupModule } from '@widget/popup';

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
    LayoutModule,
    PopupModule,
    StaticPagesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: LanguageLoader
      }
    })
  ],
  providers: [
    {
      provide: HttpClient,
      useClass: HttpService
    },
    {
      provide: LocalStorage,
      useValue: new LocalStorage()
    },
    {
      provide: SessionStorage,
      useValue: new SessionStorage('storage')
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
