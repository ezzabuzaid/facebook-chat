import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppUtils } from '@core/helpers/utils';
import { UploadService } from '@shared/services/upload';

@Component({
  selector: 'app-file-upload-progress',
  templateUrl: './file-upload-progress.component.html',
  styleUrls: ['./file-upload-progress.component.scss'],
})
export class FileUploadProgressComponent implements OnInit {
  @Output() onUpload = new EventEmitter();
  @Input() rawFile: File;
  @Input() folder: string;
  isImage = null;
  fileBase64 = null;

  constructor(
    private uploadService: UploadService
  ) { }

  ngOnInit() {
    this.isImage = AppUtils.isImage(this.rawFile.name);

    this.uploadService.uploadImage(this.rawFile, this.folder)
      .subscribe((uploadedFile) => {
        this.onUpload.emit(uploadedFile);
      });

    this.fileBase64 = AppUtils.readFile(this.rawFile)

  }

}
