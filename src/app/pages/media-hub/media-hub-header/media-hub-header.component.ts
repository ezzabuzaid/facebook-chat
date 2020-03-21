import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadService } from '@shared/services/upload';
import { MediaHubManager } from '../media-hub.manager';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-media-hub-header',
  templateUrl: './media-hub-header.component.html',
  styleUrls: ['./media-hub-header.component.scss']
})
export class MediaHubHeaderComponent implements OnInit {
  searchControl = new FormControl(this.mediaHubManager.getQueryParam('file'));

  constructor(
    private uploadService: UploadService,
    private mediaHubManager: MediaHubManager
  ) { }

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        takeUntil(this.mediaHubManager.subscription),
      )
      .subscribe((file) => {
        this.mediaHubManager.search({ file });
      })

    this.mediaHubManager.onFolderChange()
      .pipe(
        takeUntil(this.mediaHubManager.subscription),
      )
      .subscribe(() => {
        this.searchControl.setValue('');
      })
  }


  uploadFiles(files: FileList) {
    // TODO: setup `others` folder to upload a file to it if no folder specifed
    const folder_id = this.mediaHubManager.getCurrentFolderID();
    if (folder_id) {
      for (const file of (files as any)) {
        this.uploadService.uploadImage(file, folder_id).subscribe();
      }
    }
  }

}
