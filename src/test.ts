// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from '@core/http';
import { LocalStorage, SessionStorage } from '@ezzabuzaid/document-storage';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreModule } from '@core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@shared/common';
import { RouterTestingModule } from '@angular/router/testing';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientTestingModule,
    CoreModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterTestingModule.withRoutes([])
  ],
  providers: [
    {
      provide: HttpClient,
      useClass: HttpService
    },
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
