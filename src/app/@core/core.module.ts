import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AuthInterceptor, CacheInterceptor, LoggerInterceptor, UiInterceptor, HeadersInterceptor, UrlInterceptor } from './interceptors';
import { HttpService } from './http.service';
import { PopupModule } from '@widget/popup';
import { SnackbarModule } from '@widget/snackbar';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { LanguageLoader } from './helpers';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { GlobalErrorHandler } from './helpers/error-handler.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireDatabaseModule,
    // AngularFireStorageModule,
    HttpClientModule,
    PopupModule,
    SnackbarModule
  ],
  providers: [
    {
      provide: HttpClient,
      useClass: HttpService
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UiInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
})
export class CoreModule { }
