import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@shared/common/material.module';
import { DirectivesModule } from '@shared/directives';
import { ProgressBarModule } from '@widget/progress-bar';
import { SidebarModule } from 'app/widget/sidebar';
import { ContainerComponent } from './container/container.component';
import { ContentComponent } from './content/content.component';
import { LayoutRoutingModule } from './layout-routing.module';
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
    ContainerComponent,
    ContentComponent,
  ]
})
export class LayoutModule { }
