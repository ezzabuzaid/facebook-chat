import { Component, OnInit, Output, EventEmitter, Input, HostBinding, HostListener, AfterViewInit } from '@angular/core';
import { UploadsService } from '@shared/services/upload';
import { MediaModel } from '@shared/models';
import { MediaHubManager } from 'app/pages/media-hub/media-hub.manager';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss'],
  host: { class: 'pointer' }
})
export class FileViewerComponent implements OnInit {
  /**
   * An event emitter that will emit as soon the file has been uploaded
   */
  @Output() onUpload = new EventEmitter<MediaModel.File>();

  @Input() withLoader = true;
  @Input() lightBox = true;
  @Input() file: MediaModel.File;
  @HostBinding('class.uploading') loading = false;
  @HostBinding('class.is-image') isImage = null;

  constructor(
    private uploadService: UploadsService,
    private mediaHubManager: MediaHubManager,
  ) { }

  ngOnInit() {
    this.isImage = this.file.isImage();
    if (this.file.rawFile) {
      this.loading = true;
      this.uploadService.uploadImage(this.file.rawFile, this.file.folder)
        .subscribe((uploadedFile) => {
          this.loading = false;
          this.file.rawFile = null;
          this.file.path = uploadedFile.path;
          this.file._id = uploadedFile.id;
          this.onUpload.emit(this.file);
          this.isImage = this.file.isImage();
        });
    }
  }

  @HostListener('click')
  openLightbox() {
    if (this.lightBox && !this.file.rawFile) {
      this.mediaHubManager.openLightbox({
        file: this.file,
        folder: this.file.folder
      });
    }
  }

}
