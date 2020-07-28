// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorage, SessionStorage } from '@ezzabuzaid/document-storage';
import { MaterialModule, IRequestOptions } from '@shared/common';
import 'zone.js/dist/zone-testing';
import { RequestOptionsModule } from '@ezzabuzaid/ngx-request-options';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterTestingModule.withRoutes([]),
    HttpClientTestingModule,
    RequestOptionsModule.forRoot<IRequestOptions>({
      DEFAULT_URL: true,
      SNACKBAR: false,
      PROGRESS_BAR: true,
      FORM_PROGRESS_BAR: true,
      FULL_RESPONSE: false,
      LOCAL_CACHE: false,
      CACHE_CATEGORY: 'local_cache'
    }),
  ],
  providers: [
    LocalStorage,
    SessionStorage
  ],
})
export class TestModule { }

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  [BrowserDynamicTestingModule, TestModule],
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./app', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);

// Keep this line here to have tell typescript compiler that configure is exist
declare module '@angular/common/http/http' {
  // Augment HttpClient with the added `configure` method
  export interface HttpClient {
    /**
    * Configure request options.
    */
    configure(options: Partial<IRequestOptions>): HttpClient;
  }
}
