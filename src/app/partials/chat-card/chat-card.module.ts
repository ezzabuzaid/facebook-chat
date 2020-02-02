import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatCardComponent } from './chat-card.component';
import { MaterialModule } from '@shared/common';
import { GravatarModule } from 'ngx-gravatar';
import { ChatCardManager } from './chat-card.manager';


@NgModule({
  declarations: [ChatCardComponent],
  exports: [ChatCardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    GravatarModule
  ],
  providers: [
    ChatCardManager
  ]
})
export class ChatCardModule { }
