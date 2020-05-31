import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@shared/common/material.module';
import { DirectivesModule } from '@shared/directives';
import { ProgressBarModule } from '@widget/progress-bar';
import { SidebarModule } from 'app/widget/sidebar';
import { NavbarCollapseComponent } from './components/navbar-collapse/navbar-collapse.component';
import { NavbarHeaderComponent } from './components/navbar-header/navbar-header.component';
import { NavbarItemComponent } from './components/navbar-item/navbar-item.component';
import { ContainerComponent } from './container/container.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

import { ChatModule } from 'app/pages/chat';
import { GravatarModule } from 'ngx-gravatar';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MaterialModule,
    SidebarModule,
    TranslateModule.forChild(),
    ScrollingModule,
    DirectivesModule,
    GravatarModule,
    ChatModule,
    ProgressBarModule
  ],
  declarations: [
    ToolbarComponent,
    NavbarComponent,
    FooterComponent,
    ContainerComponent,
    ContentComponent,
    NavbarItemComponent,
    NavbarCollapseComponent,
    NavbarHeaderComponent,
  ]
})
export class LayoutModule { }
