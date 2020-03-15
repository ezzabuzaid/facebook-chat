import { Component, OnInit } from '@angular/core';
import { UploadService } from '@shared/services/upload';
import { MediaHubManager } from '../media-hub.manager';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-media-hub-header',
  templateUrl: './media-hub-header.component.html',
  styleUrls: ['./media-hub-header.component.scss']
})
export class MediaHubHeaderComponent implements OnInit {

  constructor(
    private uploadService: UploadService,
    private mediaHubManager: MediaHubManager
  ) { }

  ngOnInit(): void {
  }

  searchForFiles(name: string) {
    this.mediaHubManager.search({
      file: name
    });
  }

  uploadFiles(files: FileList) {
    // TODO: setup `others` folder to upload a file to it if no folder specifed
    const folder_id = this.mediaHubManager.getCurrentFolderID();
    console.log(folder_id);
    if (folder_id) {
      for (const file of (files as any)) {
        this.uploadService.uploadImage(file, folder_id).subscribe(console.log);
      }
    }
  }

}
