import { Component, OnInit, Input } from '@angular/core';
import { MediaModel } from '@shared/models';
import { UploadService } from '@shared/services/upload';
import { MediaHubManager } from '../media-hub.manager';

@Component({
  selector: 'app-media-hub-grid-view',
  templateUrl: './media-hub-grid-view.component.html',
  styleUrls: ['./media-hub-grid-view.component.scss']
})
export class MediaHubGridViewComponent implements OnInit {
  @Input() files: MediaModel.File[] = [];
  markedFiles: MediaModel.File[] = [];

  constructor(
    private uploadsService: UploadService,
    private mediaHubManager: MediaHubManager
  ) { }

  ngOnInit() {
    this.mediaHubManager.uploadListener
      .listen()
      .subscribe(event => {
        this.files.push(event);
      });
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
