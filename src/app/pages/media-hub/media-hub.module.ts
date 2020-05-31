import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FileViewerModule } from '@partials/file-viewer';
import { MaterialModule } from '@shared/common';
import { DirectivesModule } from '@shared/directives';
import { PipesModule } from '@shared/pipes';
import { FileControlModule } from '@widget/file-control/file-control.module';
import { InifiniteScrollingModule } from '@widget/inifinite-scroll';
import { MasonryModule } from '@widget/masonry';
import { SidebarModule } from '@widget/sidebar';
import { TableModule } from '@widget/table';
import { UploadFileModule } from '@widget/upload-file';
import { MediaCardComponent } from './media-card/media-card.component';
import { MediaHubFoldersComponent } from './media-hub-folders/media-hub-folders.component';
import { MediaHubGateComponent } from './media-hub-gate/media-hub-gate.component';
import { MediaHubGridViewComponent } from './media-hub-grid-view/media-hub-grid-view.component';
import { MediaHubHeaderComponent } from './media-hub-header/media-hub-header.component';
import { MediaHubListViewComponent } from './media-hub-list-view/media-hub-list-view.component';
import { MediaHubRoutingModule } from './media-hub-routing.module';
import { MediaLightboxComponent } from './media-lightbox/media-lightbox.component';
import { MediaPickerComponent } from './media-picker/media-picker.component';

@NgModule({
  declarations: [
    MediaHubFoldersComponent,
    MediaCardComponent,
    MediaHubGateComponent,
    MediaHubHeaderComponent,
    MediaHubGridViewComponent,
    MediaHubListViewComponent,
    MediaPickerComponent,
    MediaLightboxComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MediaHubRoutingModule,
    UploadFileModule,
    FileControlModule,
    ReactiveFormsModule,
    SidebarModule,
    MasonryModule,
    TableModule,
    DirectivesModule,
    PipesModule,
    FileViewerModule,
    InifiniteScrollingModule
  ],
  providers: []
})
export class MediaHubModule { }
