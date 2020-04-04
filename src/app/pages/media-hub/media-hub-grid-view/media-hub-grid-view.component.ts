import { Component, OnInit, Input } from '@angular/core';
import { MediaModel } from '@shared/models';
import { UploadService } from '@shared/services/upload';

@Component({
  selector: 'app-media-hub-grid-view',
  templateUrl: './media-hub-grid-view.component.html',
  styleUrls: ['./media-hub-grid-view.component.scss']
})
export class MediaHubGridViewComponent implements OnInit {
  @Input() files: MediaModel.IFile[] = [];
  markedFiles: MediaModel.IFile[] = [];

  constructor(
    private uploadsService: UploadService
  ) { }

  ngOnInit() {
  }

  deleteFile(id: string, index: number) {
    this.uploadsService.deleteFile(id)
      .subscribe(() => {
        this.files.splice(index, 1);
      });
  }

  addToMarkedFiles(index: number) {
    this.markedFiles.push(this.files[index]);
  }

}
