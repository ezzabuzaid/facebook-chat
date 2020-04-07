import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UploadService } from '@shared/services/upload';
import { MediaHubManager, MediaHubViews } from '../media-hub.manager';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-media-hub-header',
  templateUrl: './media-hub-header.component.html',
  styleUrls: ['./media-hub-header.component.scss']
})
export class MediaHubHeaderComponent implements OnInit {
  searchControl = new FormControl(this.mediaHubManager.getFileName());
  @Output() onViewChange = new EventEmitter<MediaHubViews>();
  EMediaHubViews = MediaHubViews;
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


  uploadFiles(files: FileList) {
    const folder = this.mediaHubManager.getFolderID();
    if (folder) {
      for (const file of (files as any)) {
        this.uploadService.uploadImage(file, folder)
          .subscribe((uploadedFile) => {
            this.mediaHubManager.uploadListener.notify({
              id: uploadedFile.id,
              path: `${environment.serverOrigin}/${uploadedFile.path}`
            });
          });
      }
    }
  }

  changeView(view: MatButtonToggleChange) {
    this.onViewChange.emit(view.value);
  }

}
