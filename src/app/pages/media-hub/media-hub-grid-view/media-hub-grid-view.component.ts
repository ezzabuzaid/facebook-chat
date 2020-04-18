import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MediaModel, ListEntityQuery } from '@shared/models';
import { UploadsService } from '@shared/services/upload';
import { MediaHubManager } from '../media-hub.manager';
import { AppUtils } from '@core/helpers/utils';
import { InifiniteScrollingComponent } from '@widget/inifinite-scroll';

@Component({
  selector: 'app-media-hub-grid-view',
  templateUrl: './media-hub-grid-view.component.html',
  styleUrls: ['./media-hub-grid-view.component.scss']
})
export class MediaHubGridViewComponent implements OnInit {
  @Input() parentSelector: HTMLElement = null;
  files: MediaModel.File[] = [];
  markedFiles: MediaModel.File[] = [];
  @ViewChild(InifiniteScrollingComponent) inifiniteScrollingComponent: InifiniteScrollingComponent;

  $provider = (pageQuery: ListEntityQuery) => this.uploadsService.searchForFiles(
    new MediaModel.FileSearchQuery(
      this.mediaHubManager.getFileName(),
      this.mediaHubManager.getFolderID(),
      this.mediaHubManager.getTagID(),
      pageQuery
    )
  );

  constructor(
    private uploadsService: UploadsService,
    private mediaHubManager: MediaHubManager,
  ) { }

  ngOnInit() {
    this.mediaHubManager.uploadListener
      .listen()
      .subscribe(event => {
        if (AppUtils.isEmptyString(this.mediaHubManager.getFileName())) {
          this.files.push(event);
        }
      });

    this.mediaHubManager.onSearch()
      .subscribe(() => {
        this.files = [];
        this.inifiniteScrollingComponent.restart();
      });
  }

  deleteFile(id: string, index: number) {
    this.uploadsService.deleteFile(id)
      .subscribe(() => {
        this.files.splice(index, 1);
      });
  }

  addToMarkedFiles(index: number) {
    this.markedFiles.push(this.files[index]);
  }

  appendFiles(files: MediaModel.File[]) {
    this.files.push(...files);
  }

}
