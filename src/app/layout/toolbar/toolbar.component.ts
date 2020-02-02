import { Component, OnInit, Inject } from '@angular/core';
import { AppUtils } from '@core/helpers/utils';
import { LanguageService, ELanguage } from '@core/helpers/language';
import { SidebarService, RegisterdSidebar } from '@widget/sidebar';
import { UserService } from '@shared/user';
import { TokenService } from '@core/helpers/token';
import { Router } from '@angular/router';
import { Constants } from '@core/constants';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  public user = this.tokenService.decodedToken;
  routes = Constants.Routing;
  languageEnum = ELanguage;
  constructor(
    private languageService: LanguageService,
    private sidebarService: SidebarService,
    private tokenService: TokenService,
    private userService: UserService
  ) { }

  ngOnInit() { }

  changeLanguage(language: ELanguage) {
    this.languageService.changeLanguage(language);
  }

  toggleFullScreen() {
    // TODO: Create full screen directive
    AppUtils.fullScreen();
  }

  toggleSidebar() {
    this.sidebarService.getSidebar(RegisterdSidebar.NAVBAR).toggle();
  }

  logout() {
    this.userService.logout().subscribe();
  }

}
