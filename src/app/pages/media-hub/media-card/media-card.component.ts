import { Component, OnInit, Input, Output, EventEmitter, HostBinding, ViewEncapsulation } from '@angular/core';
import { MediaModel } from '@shared/models';
import { UploadsService } from '@shared/services/upload';
import { PopupManager } from '@widget/popup';
import { switchMap, filter, share } from 'rxjs/operators';
import { AppUtils } from '@core/helpers/utils';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MediaCardComponent implements OnInit {
  @Input() file: MediaModel.File;
  @Output() onMarkChange = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  @Input() @HostBinding('class.checked') checked = false;
  @Input() @HostBinding('class.markable') markable = true;
  @Input() showMenu = true;
  @Input() lightBox = true;
  $tags = this.uploadsService.getTags();

  constructor(
    private popupManager: PopupManager,
    private uploadsService: UploadsService,
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

  tagFile(event: Event, tag: MediaModel.Tag) {
    // AppUtils.preventBubblingAndCapturing(event);
    this.uploadsService.updateFile({ tag: tag.id, _id: this.file._id }).subscribe();
  }

}
