import { Component, OnInit } from '@angular/core';
import { Constants } from '@core/constants';
import { ELanguage, LanguageService } from '@core/helpers/language';
import { TokenHelper } from '@core/helpers/token';
import { UserService } from '@shared/account';
import { RegisterdSidebar, SidebarService } from '@widget/sidebar';

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
    private readonly languageService: LanguageService,
    private readonly sidebarService: SidebarService,
    private readonly tokenService: TokenHelper,
    private readonly userService: UserService
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
