import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/common';
import { GravatarModule } from 'ngx-gravatar';
import { TimeagoModule } from 'ngx-timeago';
import { ChatCardManager } from './chat-card.manager';
import { GroupCharCardComponent } from './chat-group-card/chat-group-card.component';
import { GroupChatCreateComponent } from './group-chat-create/group-chat-create.component';
import { FormModule } from '@partials/form';
import { UploadFileModule } from '@widget/upload-file';

import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { ChatFloatingButtonComponent } from './chat-floating-button/chat-floating-button.component';
import { UserCardComponent } from './conversation-chat-card/conversation-chat-card.component';
import { ChatGroupMembersComponent } from './chat-group-members/chat-group-members.component';
import { ChatCreateCardComponent } from './chat-create-card/chat-create-card.component';
import { ChatCardComponent } from './chat-card/chat-card.component';

@NgModule({
  declarations: [
    UserCardComponent,
    GroupCharCardComponent,
    GroupChatCreateComponent,
    ChatGroupMembersComponent,
    ChatFloatingButtonComponent,
    ChatCreateCardComponent,
    ChatCardComponent
  ],
  exports: [
    UserCardComponent,
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
    EmojiModule
  ],
  providers: [
    ChatCardManager
  ]
})
export class ChatModule { }
