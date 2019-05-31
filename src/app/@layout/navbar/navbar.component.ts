import { Component, Inject } from '@angular/core';
import { Logger } from '@core/utils';
import { Router } from '@angular/router';
import {LocalStorage } from '@core/helpers';
import navigation from './navigation';
import { DOCUMENT } from '@angular/common';

const log = new Logger('Navbar Header');
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public navigationMenu = navigation;

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private localStorage: LocalStorage
  ) { }

  logout() {
    this.router.navigate(['/portal/login']);
    this.localStorage.clear();
  }

  perfectScrollBarHeight(header: HTMLElement) {
    return this.document.documentElement.clientHeight - header.clientHeight;
  }

}
