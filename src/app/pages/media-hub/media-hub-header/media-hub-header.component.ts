import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { UploadService } from '@shared/services/upload';
import { MediaHubManager, MediaHubViews } from '../media-hub.manager';
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
  @Output() onViewChange = new EventEmitter();

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
    console.log(files);
    const folder_id = this.mediaHubManager.getCurrentFolderID();
    if (folder_id) {
      for (const file of (files as any)) {
        this.uploadService.uploadImage(file, folder_id).subscribe();
      }
    }
  }


  listView() {
    this.onViewChange.emit(MediaHubViews.ListView);
  }

  gridView() {
    this.onViewChange.emit(MediaHubViews.GridView);
  }

}
