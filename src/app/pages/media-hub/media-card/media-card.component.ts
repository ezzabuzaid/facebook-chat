import { Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { AppUtils } from '@core/helpers/utils';
import { MediaModel } from '@shared/models';
import { UploadsService } from '@shared/services/upload';
import { PopupManager } from '@widget/popup';
import { filter, switchMap } from 'rxjs/operators';

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
    private readonly popupManager: PopupManager,
    private readonly uploadsService: UploadsService,
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

  tagFile(tag: MediaModel.Tag) {
    this.uploadsService.updateFile({ tag: tag.id, _id: this.file._id }).subscribe();
  }

}
