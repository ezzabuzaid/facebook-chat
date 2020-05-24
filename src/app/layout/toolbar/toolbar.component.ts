import { Component, OnInit } from '@angular/core';
import { LanguageService, ELanguage } from '@core/helpers/language';
import { SidebarService, RegisterdSidebar } from '@widget/sidebar';
import { UserService } from '@shared/account';
import { TokenHelper } from '@core/helpers/token';
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
  constructor (
    private languageService: LanguageService,
    private sidebarService: SidebarService,
    private tokenService: TokenHelper,
    private userService: UserService
  ) { }

  ngOnInit() { }

  changeLanguage(language: ELanguage) {
    this.languageService.changeLanguage(language);
  }

  toggleSidebar() {
    this.sidebarService.getSidebar(RegisterdSidebar.NAVBAR).toggle();
  }

  logout() {
    this.userService.logout();
  }

}
