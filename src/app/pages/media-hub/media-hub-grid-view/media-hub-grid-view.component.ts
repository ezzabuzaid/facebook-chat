import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppUtils } from '@core/helpers/utils';
import { ListEntityQuery, MediaModel } from '@shared/models';
import { UploadsService } from '@shared/services/upload';
import { InifiniteScrollingComponent } from '@widget/inifinite-scroll';
import { MediaHubManager } from '../media-hub.manager';

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

  constructor(
    private readonly uploadsService: UploadsService,
    private readonly mediaHubManager: MediaHubManager,
    private readonly snackbar: MatSnackBar
  ) { }

  $provider = (pageQuery: ListEntityQuery) => this.uploadsService.searchForFiles(
    new MediaModel.FileSearchQuery(
      this.mediaHubManager.getFileName(),
      this.mediaHubManager.getFolderID(),
      this.mediaHubManager.getTagID(),
      pageQuery
    )
  )

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
        if (
          this.mediaHubManager.getFolderID()
          ||
          this.mediaHubManager.getTagID()
        ) {
          this.inifiniteScrollingComponent.restart();
        } else {
          this.snackbar.open('Please select either folder or tag');
        }
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
