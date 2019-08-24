import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppShellLoaderComponent } from './app-shell-loader.component';

@NgModule({
  declarations: [AppShellLoaderComponent],
  exports: [AppShellLoaderComponent],
  imports: [
    CommonModule
  ]
})
export class AppShellLoaderModule { }
