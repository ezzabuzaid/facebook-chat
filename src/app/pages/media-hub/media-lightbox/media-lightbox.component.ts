import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaModel, ListEntityResponse, ListEntityQuery } from '@shared/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UploadsService } from '@shared/services/upload';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { typeaheadOperator } from '@core/helpers/utils';
import { MediaHubManager } from '../media-hub.manager';
import { InifiniteScrollingComponent } from '@widget/inifinite-scroll';
export interface ILightBoxData {
  file: MediaModel.File,
  folder?: string,
  tag?: string
}
@Component({
  selector: 'app-media-lightbox',
  templateUrl: './media-lightbox.component.html',
  styleUrls: ['./media-lightbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaLightboxComponent implements OnInit {
  $folders = this.uploadService.getFolders();
  $tags = this.uploadService.getTags();
  files: MediaModel.File[] = [];
  $provider = (pageQuery: ListEntityQuery) => this.uploadsService.searchForFiles(
    new MediaModel.FileSearchQuery(null, this.dialogData.folder, this.dialogData.tag, pageQuery)
  );
  @ViewChild(InifiniteScrollingComponent) inifiniteScrollingComponent: InifiniteScrollingComponent;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: ILightBoxData,
    @Inject(MatDialogRef) private dialogRef: MatDialogRef<MediaLightboxComponent>,
    private uploadService: UploadsService,
    private cdf: ChangeDetectorRef,
    private uploadsService: UploadsService
  ) { }

  ngOnInit() { }

  appendFiles(files: MediaModel.File[]) {
    this.files.push(...files);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  openFolder(folder: MediaModel.Folder) {
    this.dialogData.folder = folder._id;
    this.files = [];
    this.inifiniteScrollingComponent.restart();
  }

  filterByTag(tag: MediaModel.Tag) {
    this.dialogData.folder = tag.id;
    this.files = [];
    this.inifiniteScrollingComponent.restart();
  }

  selectFile(file: MediaModel.File) {
    this.dialogData.file = file;
    this.cdf.markForCheck();
  }

}
