import { Component, OnInit } from '@angular/core';
import { ApplicationUser } from '@core/application-user';
import { Constants } from '@core/constants';
import { ELanguage, LanguageService } from '@core/helpers/language';
import { TokenHelper } from '@core/helpers/token';
import { RegisterdSidebar, SidebarManager } from '@widget/sidebar';

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
    private readonly languageService: LanguageService,
    private readonly sidebarService: SidebarManager,
    private readonly tokenService: TokenHelper,
    private readonly applicationUser: ApplicationUser
  ) { }

  ngOnInit() { }

  changeLanguage(language: ELanguage) {
    this.languageService.changeLanguage(language);
  }

  toggleSidebar() {
    this.sidebarService.getSidebar(RegisterdSidebar.NAVBAR).toggle();
  }

  logout() {
    this.applicationUser.logout();
  }

}
