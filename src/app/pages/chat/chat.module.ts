import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@shared/common';
import { UploadFileModule } from '@widget/upload-file';
import { GravatarModule } from 'ngx-gravatar';
import { TimeagoModule } from 'ngx-timeago';
import { ChatCardManager } from './chat-card.manager';
import { ChatGroupCardComponent } from './chat-group-card/chat-group-card.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FileViewerModule } from '@partials/file-viewer';
import { PipesModule } from '@shared/pipes';
import { FileControlModule } from '@widget/file-control/file-control.module';
import { InifiniteScrollingModule } from '@widget/inifinite-scroll';
import { ChatCardFooterComponent } from './chat-card-footer/chat-card-footer.component';
import { ChatCardMessagesComponent } from './chat-card-messages/chat-card-messages.component';
import { ChatCardComponent } from './chat-card/chat-card.component';
import { ChatConversationCardComponent } from './chat-conversation-card/chat-conversation-card.component';
import { ChatCreateCardComponent } from './chat-create-card/chat-create-card.component';
import { ChatFloatingButtonComponent } from './chat-floating-button/chat-floating-button.component';
import { ChatGroupMembersComponent } from './chat-group-members/chat-group-members.component';
import { MessageBubbleComponent } from './message-bubble/message-bubble.component';

@NgModule({
  declarations: [
    ChatConversationCardComponent,
    ChatGroupCardComponent,
    ChatGroupMembersComponent,
    ChatFloatingButtonComponent,
    ChatCreateCardComponent,
    ChatCardComponent,
    ChatCardMessagesComponent,
    ChatCardFooterComponent,
    MessageBubbleComponent,
  ],
  exports: [
    ChatConversationCardComponent,
    ChatGroupCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    GravatarModule,
    TimeagoModule.forRoot(),
    UploadFileModule,
    FileControlModule,
    PipesModule,
    FileViewerModule,
    InifiniteScrollingModule,
    ReactiveFormsModule
  ],
  providers: [
    ChatCardManager
  ]
})
export class ChatModule { }
