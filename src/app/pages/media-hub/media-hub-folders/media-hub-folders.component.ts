import { Component, OnInit } from '@angular/core';
import { UploadService } from '@shared/services/upload';
import { AppUtils } from '@core/helpers/utils';
import { MediaModel } from '@shared/models';

@Component({
  selector: 'app-media-hub-folders',
  templateUrl: './media-hub-folders.component.html',
  styleUrls: ['./media-hub-folders.component.scss']
})
export class MediaHubFoldersComponent implements OnInit {
  folders: MediaModel.IFolder[] = [];
  files: MediaModel.IFile[] = [];
  createFolderActive = false;

  constructor(
    private uploadsService: UploadService
  ) { }

  ngOnInit() {
    this.getFolders();
  }

  createFolder(name: string) {
    if (AppUtils.isTruthy(name)) {
      this.createFolderActive = !this.createFolderActive;
      this.uploadsService.createFolder(name)
        .subscribe(() => {
          this.toggleFolderCreation();
        })
    }
  }

  toggleFolderCreation() {
    this.createFolderActive = !this.createFolderActive;
  }

  getFolderFiles(folder: MediaModel.IFolder) {
    this.uploadsService.getFolderFiles(folder._id)
      .subscribe(data => {
        this.files = data;
      })
  }
  getFolders() {
    this.uploadsService.getFolders()
      .subscribe(data => {
        this.folders = data;
      })
  }

}
