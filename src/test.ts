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
import { CoreModule } from '@core/core.module';
import { LocalStorage, SessionStorage } from '@ezzabuzaid/document-storage';
import { MaterialModule } from '@shared/common';
import 'zone.js/dist/zone-testing';

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
