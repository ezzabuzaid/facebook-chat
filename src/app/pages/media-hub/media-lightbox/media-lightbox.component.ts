import { Component, OnInit, Input, Inject } from '@angular/core';
import { MediaModel } from '@shared/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MediaHubManager } from '../media-hub.manager';
import { RouteUtility } from '@shared/common';
import { UploadService } from '@shared/services/upload';

@Component({
  selector: 'app-media-lightbox',
  templateUrl: './media-lightbox.component.html',
  styleUrls: ['./media-lightbox.component.scss'],
  providers: [MediaHubManager, RouteUtility]
})
export class MediaLightboxComponent implements OnInit {
  $folders = this.uploadService.getFolders()

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      file: MediaModel.IFile
    },
    @Inject(MatDialogRef) private dialogRef: MatDialogRef<MediaLightboxComponent>,
    private uploadService: UploadService,
  ) { }

  ngOnInit() { }

  closeDialog() {
    this.dialogRef.close();
  }

}
