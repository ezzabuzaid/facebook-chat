import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaHubRoutingModule } from './media-hub-routing.module';
import { MediaHubFoldersComponent } from './media-hub-folders/media-hub-folders.component';
import { MediaCardComponent } from './media-card/media-card.component';
import { MaterialModule } from '@shared/common';
import { MediaHubGateComponent } from './media-hub-gate/media-hub-gate.component';


@NgModule({
  declarations: [
    MediaHubFoldersComponent,
    MediaCardComponent,
    MediaHubGateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MediaHubRoutingModule
  ]
})
export class MediaHubModule { }
