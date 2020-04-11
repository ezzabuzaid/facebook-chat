import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UploadService } from '@shared/services/upload';
import { MediaHubManager, MediaHubViews } from '../media-hub.manager';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { MediaModel } from '@shared/models';

@Component({
  selector: 'app-media-hub-header',
  templateUrl: './media-hub-header.component.html',
  styleUrls: ['./media-hub-header.component.scss']
})
export class MediaHubHeaderComponent implements OnInit {
  searchControl = new FormControl(this.mediaHubManager.getFileName());
  @Output() onViewChange = new EventEmitter<MediaHubViews>();
  EMediaHubViews = MediaHubViews;
  $folder = this.mediaHubManager.onFolderChange();

  constructor(
    private uploadService: UploadService,
    private mediaHubManager: MediaHubManager
  ) { }

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(takeUntil(this.mediaHubManager.subscription))
      .subscribe((file) => {
        this.mediaHubManager.search({ file });
      })

    this.mediaHubManager.onFolderChange()
      .pipe(takeUntil(this.mediaHubManager.subscription))
      .subscribe(() => {
        this.searchControl.setValue('', { emitEvent: false });
        this.mediaHubManager.search(null);
      })
  }

  async uploadFiles(files: FileList) {
    const folder = this.mediaHubManager.getFolderID();
    if (folder) {
      for (const file of Array.from(files)) {
        this.mediaHubManager.uploadListener.notify(
          new MediaModel.File({
            path: null,
            folder: this.mediaHubManager.getFolderID(),
            name: file.name,
            type: file.type,
            size: file.size,
            rawFile: file
          })
        );
      }
    }
  }

  changeView(view: MediaHubViews) {
    this.onViewChange.emit(view);
  }

}
