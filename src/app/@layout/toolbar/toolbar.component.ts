import { Component, OnInit, Inject } from '@angular/core';
import { AppUtils } from '@core/helpers';
import { LanguageService } from '@core/helpers';
import { NavbarComponent } from '@layout/navbar/navbar.component';
import { SidebarService, RegisterdSidebar } from '@widget/sidebar';
import { Logger } from '@core/utils';

const log = new Logger('ToolbarComponent');
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    @Inject(NavbarComponent) private navbarComponent: NavbarComponent,
    private languageService: LanguageService,
    private sidebarService: SidebarService,
  ) { }

  ngOnInit() { }

  changeLanguage(language) {
    this.languageService.changeLanguage(language);
  }

  toggleFullScreen() {
    AppUtils.fullScreen();
  }

  toggleSidebar() {
    // NOTE Remove the explict inject of navbar component and use create method in sidebar service to handle the close
    // NOTE this used to trigger that the navbar closed from the humburger icon.
    this.sidebarService.getSidebar(RegisterdSidebar.NAVBAR).toggleSidebar();
    // this.navbarComponent.folded = false;
  }

}
