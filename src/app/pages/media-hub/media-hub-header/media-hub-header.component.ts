import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MediaHubManager, MediaHubViews } from '../media-hub.manager';
import { FormControl } from '@angular/forms';
import { takeUntil, skip } from 'rxjs/operators';
import { MediaModel } from '@shared/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppUtils } from '@core/helpers/utils';

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
    private mediaHubManager: MediaHubManager,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(takeUntil(this.mediaHubManager.subscription))
      .subscribe((searchText) => {
        if (AppUtils.isTruthy(searchText)) {
          this.mediaHubManager.search({
            file: searchText,
            folder: this.mediaHubManager.getFolderID(),
            tag: this.mediaHubManager.getTagID()
          });
        } else {
          this.snackbar.open('Please select either folder or tag');
        }
      })

    this.mediaHubManager.onFolderChange()
      .pipe(
        takeUntil(this.mediaHubManager.subscription),
        skip(1)
      )
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
            folder,
            name: file.name,
            type: file.type,
            size: file.size,
            rawFile: file
          })
        );
      }
    } else {
      this.snackbar.open('Please select folder');
    }
  }


  changeView(view: MediaHubViews) {
    this.onViewChange.emit(view);
  }

}
