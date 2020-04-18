import { Component, OnInit } from '@angular/core';
import { MediaModel } from '@shared/models';
import { UploadsService } from '@shared/services/upload';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-media-picker',
  templateUrl: './media-picker.component.html',
  styleUrls: ['./media-picker.component.scss']
})
export class MediaPickerComponent implements OnInit {
  currentFolderID = null;
  $folders = this.uploadService.getFolders()
    .pipe(tap(folders => {
      this.onFolderClick(folders[0]);
    }))

  files: MediaModel.File[] = [];
  markedFiles: MediaModel.File[] = [];

  constructor(
    private uploadService: UploadsService,
  ) { }

  ngOnInit(): void {
  }

  onFolderClick(folder: MediaModel.Folder) {
    this.currentFolderID = folder._id;
    this.uploadService.searchForFiles({
      file: '',
      folder: folder._id,
    })
      .subscribe(files => {
        this.files = files.list;
      })
  }

  addToMarkedFiles(index: number) {
    this.markedFiles.push(this.files[index]);
  }

}
