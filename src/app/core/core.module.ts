import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpService } from './http';
import {
  LoggerInterceptor,
  HeadersInterceptor,
  UrlInterceptor,
  AuthInterceptor,
  ProgressInterceptor,
  SetupInterceptor,
} from './interceptors';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { PopupModule } from '@widget/popup';
import { StaticPagesModule } from 'app/pages/static-pages/static-pages.module';


@NgModule({
  imports: [
    CommonModule,
    PopupModule,
    StaticPagesModule
  ],
  providers: [
    {
      provide: HttpClient,
      useClass: HttpService
    },
    // { TODO use sentry for now
    //   provide: ErrorHandler,
    //   useClass: GlobalErrorHandler
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SetupInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProgressInterceptor,
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
  ]
})
export class CoreModule { }
