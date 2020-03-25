import { Component, OnInit, OnDestroy } from '@angular/core';
import { switchMap, tap, takeUntil, filter } from 'rxjs/operators';
import { UploadService } from '@shared/services/upload';
import { MediaModel } from '@shared/models';
import { MediaHubManager } from '../media-hub.manager';
import { Observable } from 'rxjs';
import { AppUtils, typeaheadOperator } from '@core/helpers/utils';

@Component({
  selector: 'app-media-hub-gate',
  templateUrl: './media-hub-gate.component.html',
  styleUrls: ['./media-hub-gate.component.scss'],
  providers: [MediaHubManager]
})
export class MediaHubGateComponent implements OnInit, OnDestroy {
  files: MediaModel.IFile[] = [];
  markedFiles: MediaModel.IFile[] = [];

  constructor(
    private uploadsService: UploadService,
    private mediaManager: MediaHubManager
  ) { }

  ngOnInit() {
    this.mediaManager.onSearch()
      .pipe(
        takeUntil(this.mediaManager.subscription),
        typeaheadOperator(
          ({ fileName, folder_id }) => this.uploadsService.searchForFiles(
            new MediaModel.FileSearchQuery(folder_id, fileName)
          ),
        )
      )
      .subscribe((data) => {
        this.files = data;
      })
  }

  ngOnDestroy() {
    AppUtils.unsubscribe(this.mediaManager.subscription);
  }

  addToMarkedFiles(index: number) {
    this.markedFiles.push(this.files[index]);
  }

}
