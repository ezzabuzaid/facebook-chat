import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { MediaModel } from '@shared/models';
import { UploadService } from '@shared/services/upload';
import { PopupManager } from '@widget/popup';
import { switchMap, filter } from 'rxjs/operators';
import { MediaHubManager } from '../media-hub.manager';
import { AppUtils } from '@core/helpers/utils';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.scss'],
})
export class MediaCardComponent implements OnInit {
  @Input() file: MediaModel.File;
  @Output() onMarkChange = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  @Input() @HostBinding('class.checked') checked = false;
  @Input() @HostBinding('class.markable') markable = true;
  @Input() showMenu = true;
  @Input() lightBox = true;

  constructor(
    private popupManager: PopupManager,
    private uploadsService: UploadService,
    private mediaHubManager: MediaHubManager
  ) { }

  ngOnInit() {
    this.markable = AppUtils.isFalsy(this.file.rawFile) && this.markable;
  }

  toggleChecking() {
    this.onMarkChange.emit(this.file);
    this.checked = !this.checked;
  }

  deleteFile() {
    this.onDelete.emit(this.file._id);
  }

  renameFile() {
    this.popupManager.prompt({
      hasBackdrop: true,
      data: {
        confirm: 'Save',
        value: this.file.name
      }
    })
      .afterClosed()
      .pipe(
        filter(name => name !== this.file.name),
        switchMap(name => {
          this.file.name = name;
          return this.uploadsService.updateFile({ name, _id: this.file._id });
        }))
      .subscribe();
  }

  patchFile(event: MediaModel.File) {
    this.file = event;
  }
}
