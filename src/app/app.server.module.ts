import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AppShellLoaderModule } from './widget/app-shell-loader/app-shell-loader.module';
import { AppShellLoaderComponent } from './widget/app-shell-loader/app-shell-loader.component';

const routes: Routes = [{ path: 'shell', component: AppShellLoaderComponent }];


@NgModule({
  imports: [
    AppModule,
    ServerModule,
    AppShellLoaderModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled'
    })
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule { }
