import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/common';
import { GravatarModule } from 'ngx-gravatar';
import { TimeagoModule } from 'ngx-timeago';
import { ChatCardManager } from './chat-card.manager';
import { GroupCharCardComponent } from './chat-group-card/chat-group-card.component';
import { FormModule } from '@partials/form';
import { UploadFileModule } from '@widget/upload-file';

import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { ChatFloatingButtonComponent } from './chat-floating-button/chat-floating-button.component';
import { ChatGroupMembersComponent } from './chat-group-members/chat-group-members.component';
import { ChatCreateCardComponent } from './chat-create-card/chat-create-card.component';
import { ChatCardComponent } from './chat-card/chat-card.component';
import { ChatCardMessagesComponent } from './chat-card-messages/chat-card-messages.component';
import { ChatCardFooterComponent } from './chat-card-footer/chat-card-footer.component';
import { ChatConversationCardComponent } from './chat-conversation-card/chat-conversation-card.component';
import { FileControlModule } from '@widget/file-control/file-control.module';

@NgModule({
  declarations: [
    ChatConversationCardComponent,
    GroupCharCardComponent,
    ChatGroupMembersComponent,
    ChatFloatingButtonComponent,
    ChatCreateCardComponent,
    ChatCardComponent,
    ChatCardMessagesComponent,
    ChatCardFooterComponent
  ],
  exports: [
    ChatConversationCardComponent,
    GroupCharCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    GravatarModule,
    FormModule,
    TimeagoModule.forRoot(),
    UploadFileModule,
    PickerModule,
    EmojiModule,
    FileControlModule
  ],
  providers: [
    ChatCardManager
  ]
})
export class ChatModule { }
