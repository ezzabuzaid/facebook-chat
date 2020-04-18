import { Component, OnInit, Output, EventEmitter, Input, HostBinding, HostListener } from '@angular/core';
import { UploadsService } from '@shared/services/upload';
import { AppUtils } from '@core/helpers/utils';
import { MediaModel } from '@shared/models';
import { MediaHubManager } from 'app/pages/media-hub/media-hub.manager';
import { Observable, of } from 'rxjs';

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
  isImage = null;
  @HostBinding('class.uploading') loading = false;
  path: Observable<string>;


  constructor(
    private uploadService: UploadsService,
    private mediaHubManager: MediaHubManager,
  ) { }

  ngOnInit() {
    this.isImage = AppUtils.isImage(this.file.name);
    if (this.file.rawFile) {
      this.loading = true;
      this.path = AppUtils.readFile(this.file.rawFile)
      this.uploadService.uploadImage(this.file.rawFile, this.file.folder)
        .subscribe((uploadedFile) => {
          this.loading = false;
          this.file.rawFile = null;
          this.file.path = uploadedFile.path;
          this.file._id = uploadedFile.id;
          this.path = of(this.file.fullPath);
          this.onUpload.emit(this.file);
        });
    } else {
      this.path = of(this.file.fullPath);
    }
  }

  @HostListener('click')
  async openLightbox() {
    if (this.lightBox && !this.file.rawFile) {
      this.mediaHubManager.openLightbox({
        file: this.file,
        folder: this.file.folder
      });
    }
  }

}
