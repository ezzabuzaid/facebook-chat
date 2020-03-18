import { Component, OnInit } from '@angular/core';
import { UploadService } from '@shared/services/upload';
import { AppUtils } from '@core/helpers/utils';
import { MediaModel } from '@shared/models';
import { MediaHubManager } from '../media-hub.manager';

@Component({
  selector: 'app-media-hub-folders',
  templateUrl: './media-hub-folders.component.html',
  styleUrls: ['./media-hub-folders.component.scss']
})
export class MediaHubFoldersComponent implements OnInit {
  folders: MediaModel.Folder[] = [];
  currentFolderID = this.mediaHubManager.getCurrentFolderID();
  createFolderActive = false;

  constructor(
    private uploadsService: UploadService,
    private mediaHubManager: MediaHubManager
  ) { }

  ngOnInit() {
    this.getFolders();
  }

  createFolder(name: string) {
    if (AppUtils.isTruthy(name)) {
      this.uploadsService.createFolder(name)
        .subscribe(({ id }) => {
          this.toggleFolderCreation();
          this.folders.push(new MediaModel.Folder({
            _id: id,
            name: name
          }));
        })
    }
  }

  toggleFolderCreation() {
    this.createFolderActive = !this.createFolderActive;
  }

  onFolderClick(folder: MediaModel.Folder) {
    console.log('onFolderClick => ', folder);
    this.currentFolderID = folder._id;
    this.mediaHubManager.search({
      folder_id: this.currentFolderID,
      file: undefined
    });
  }

  renameFolder(folder: MediaModel.Folder) {
    console.log('renameFolder => ', folder);
    // this.uploadsService.updateFolder();
  }

  deleteFolder(folder: MediaModel.Folder, index: number) {
    console.log('deleteFolder => ', folder);
    this.uploadsService.deleteFolder(folder._id)
      .subscribe(data => {
        this.folders.splice(index, 1);
      });
  }

  getFolders() {
    this.uploadsService.getFolders()
      .subscribe(data => {
        this.folders = data;
      })
  }

}
