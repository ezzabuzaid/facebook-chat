import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  LoggerInterceptor,
  UrlInterceptor,
  ProgressInterceptor,
  SetupInterceptor,
  TeardownInterceptor,
  CacheInterceptor
} from './interceptors';
import { PopupModule } from '@widget/popup';
import { StaticPagesModule } from 'app/pages/static/static-pages.module';


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
      provide: HTTP_INTERCEPTORS,
      useClass: SetupInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggerInterceptor,
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
      useClass: ProgressInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TeardownInterceptor,
      multi: true
    },
  ]
})
export class CoreModule { }
