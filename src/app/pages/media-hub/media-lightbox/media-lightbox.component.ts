import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MediaModel } from '@shared/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UploadService } from '@shared/services/upload';
import { Observable } from 'rxjs';
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
  $files: Observable<MediaModel.File[]> = null;
  show = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: ILightBoxData,
    @Inject(MatDialogRef) private dialogRef: MatDialogRef<MediaLightboxComponent>,
    private uploadService: UploadService,
    private cdf: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.$files = this.uploadService.searchForFiles(
      {
        tag: this.dialogData.tag,
        folder: this.dialogData.folder,
      }
    )
    this.show = true;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  openFolder(folder: MediaModel.Folder) {
    this.$files = this.uploadService.searchForFiles({ folder: folder._id })
  }

  filterByTag(tag: MediaModel.Tag) {
    this.$files = this.uploadService.searchForFiles({ tag: tag.id })
  }

  selectFile(file: MediaModel.File) {
    this.dialogData.file = file;
    this.cdf.markForCheck();
  }

}
