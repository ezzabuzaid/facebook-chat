import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListEntityQuery, MediaModel } from '@shared/models';
import { UploadsService } from '@shared/services/upload';
import { InifiniteScrollingComponent } from '@widget/inifinite-scroll';

@Component({
  selector: 'app-media-picker',
  templateUrl: './media-picker.component.html',
  styleUrls: ['./media-picker.component.scss']
})
export class MediaPickerComponent implements OnInit {
  @ViewChild(InifiniteScrollingComponent) inifiniteScrollingComponent: InifiniteScrollingComponent;
  currentFolderID = this.data.folder;
  tagID = undefined;
  $folders = this.uploadService.getFolders();
  files: MediaModel.File[] = [];
  markedFiles: MediaModel.File[] = [];

  constructor(
    private readonly uploadService: UploadsService,
    @Inject(MAT_DIALOG_DATA) private readonly data: { folder: string }
  ) { }
  $provider = (pageQuery: ListEntityQuery) => this.uploadService.searchForFiles(
    new MediaModel.FileSearchQuery(
      undefined,
      this.currentFolderID,
      this.tagID,
      pageQuery
    )
  )

  ngOnInit() { }

  selectFolder(folder_id: string) {
    this.currentFolderID = folder_id;
    this.inifiniteScrollingComponent.restart();
    this.files = [];
  }

  addToMarkedFiles(index: number) {
    this.markedFiles.push(this.files[index]);
  }

  appendFiles(files: MediaModel.File[]) {
    this.files.push(...files);
  }

}
