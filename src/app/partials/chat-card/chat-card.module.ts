import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/common';
import { GravatarModule } from 'ngx-gravatar';
import { ChatCardManager } from './chat-card.manager';
import { UserCardComponent } from './user-card/user-card.component';
import { GroupCharCardComponent } from './group-chat-card/group-chat-card.component';
import { GroupChatCreateComponent } from './group-chat-create/group-chat-create.component';
import { FormModule } from '@partials/form';
import { UploadFileModule } from '@widget/upload-file';


@NgModule({
  declarations: [
    UserCardComponent,
    GroupCharCardComponent,
    GroupChatCreateComponent
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
    UploadFileModule
  ],
  providers: [
    ChatCardManager
  ]
})
export class ChatCardModule { }
