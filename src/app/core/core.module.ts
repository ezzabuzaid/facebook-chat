import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InjectionToken, NgModule } from '@angular/core';
import { AsyncDatabase, IndexedDB } from '@ezzabuzaid/document-storage';
import { CacheDatabase } from './helpers/cache';
import {
  CacheInterceptor,
  LoggerInterceptor,
  ProgressInterceptor,
  SetupInterceptor,
  TeardownInterceptor,
  UniversalInterceptor,
  UrlInterceptor
} from './interceptors';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    {
      provide: CacheDatabase,
      useValue: new AsyncDatabase(new IndexedDB('cache'))
    },
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
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: CacheInterceptor,
    //   multi: true
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalInterceptor,
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
