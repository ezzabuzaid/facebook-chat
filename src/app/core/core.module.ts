import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
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
import { StaticPagesModule } from 'app/pages/static/static-pages.module';
import { HttpService } from './http';


@NgModule({
  imports: [
    CommonModule,
    PopupModule,
    StaticPagesModule
  ],
  providers: [
    // {
    // TODO use sentry
    //   provide: ErrorHandler,
    //   useClass: GlobalErrorHandler
    // },
    {
      provide: HttpClient,
      useClass: HttpService
    },
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
