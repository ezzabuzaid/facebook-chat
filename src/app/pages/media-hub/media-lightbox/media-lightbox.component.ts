import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListEntityQuery, MediaModel } from '@shared/models';
import { UploadsService } from '@shared/services/upload';
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
  @ViewChild(InifiniteScrollingComponent) inifiniteScrollingComponent: InifiniteScrollingComponent;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: ILightBoxData,
    @Inject(MatDialogRef) private readonly dialogRef: MatDialogRef<MediaLightboxComponent>,
    private readonly uploadService: UploadsService,
    private readonly cdf: ChangeDetectorRef,
    private readonly uploadsService: UploadsService
  ) { }
  $provider = (pageQuery: ListEntityQuery) => this.uploadsService.searchForFiles(
    new MediaModel.FileSearchQuery(null, this.dialogData.folder, this.dialogData.tag, pageQuery)
  );

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
