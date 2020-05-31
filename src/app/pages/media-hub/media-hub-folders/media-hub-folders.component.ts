import { Component, OnInit } from '@angular/core';
import { AppUtils } from '@core/helpers/utils';
import { MediaModel } from '@shared/models';
import { UploadsService } from '@shared/services/upload';
import { PopupManager } from '@widget/popup';
import { filter, switchMap } from 'rxjs/operators';
import { MediaHubManager } from '../media-hub.manager';

@Component({
  selector: 'app-media-hub-folders',
  templateUrl: './media-hub-folders.component.html',
  styleUrls: ['./media-hub-folders.component.scss']
})
export class MediaHubFoldersComponent implements OnInit {
  folders: MediaModel.Folder[] = [];
  currentFolderID = this.mediaHubManager.getFolderID();
  createFolderActive = false;
  $tags = this.uploadsService.getTags();

  $sharedView = this.mediaHubManager.viewChange();

  constructor(
    private readonly uploadsService: UploadsService,
    private readonly mediaHubManager: MediaHubManager,
    private readonly popupManager: PopupManager,
  ) { }

  ngOnInit() {
    this.$sharedView
      .pipe(switchMap((value) => {
        return value
          ? this.uploadsService.getSharedFolders()
          : this.uploadsService.getUserFolders()
      }))
      .subscribe(data => {
        this.folders = data;
      })
  }

  createFolder(name: string) {
    if (AppUtils.isTruthy(name)) {
      this.uploadsService.createFolder(name)
        .subscribe(({ id }) => {
          this.toggleFolderCreation();
          this.folders.push(new MediaModel.Folder({
            _id: id,
            name
          }));
        })
    }
  }

  toggleFolderCreation() {
    this.createFolderActive = !this.createFolderActive;
  }

  filterByFolder(folder: MediaModel.Folder) {
    this.currentFolderID = folder._id;
    this.mediaHubManager.search({
      folder: this.currentFolderID,
      file: undefined,
      tag: undefined,
      page: 0,
      size: 10
    });
  }

  filterByTag(tag: MediaModel.Tag) {
    this.currentFolderID = undefined;
    this.mediaHubManager.search({
      folder: undefined,
      file: undefined,
      tag: tag.id,
      page: 0,
      size: 10
    });
  }

  renameFolder(folder: MediaModel.Folder, index: number) {
    this.popupManager.prompt({
      hasBackdrop: true,
      data: {
        confirm: 'Save',
        value: folder.name
      }
    })
      .afterClosed()
      .pipe(
        filter(name => name !== folder.name),
        switchMap(name => {
          this.folders[index].name = name;
          return this.uploadsService.updateFolder({ name, _id: folder._id });
        }))
      .subscribe();
  }

  deleteFolder(folder: MediaModel.Folder, index: number) {
    this.uploadsService.deleteFolder(folder._id)
      .subscribe(data => {
        this.folders.splice(index, 1);
      });
  }

  preventDefaults(event: Event) {
    AppUtils.preventBubblingAndCapturing(event);
  }

}
