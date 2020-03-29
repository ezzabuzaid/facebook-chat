import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { MediaModel } from '@shared/models';
import { UploadService } from '@shared/services/upload';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.scss']
})
export class MediaCardComponent implements OnInit {
  @Input() file: MediaModel.IFile;
  @Output() onMarkChange = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  @Input()
  @HostBinding('class.checked')
  checked = false;

  ngOnInit() { }

  toggleChecking() {
    this.onMarkChange.emit(this.file);
    this.checked = !this.checked;
  }

  get isImage() {
    return [
      'image/jpg', 'image/JPG', 'image/jpeg', 'image/JPEG',
      'image/png', 'image/PNG', 'image/gif', 'image/GIF',
    ].includes(this.file.fullType);
  }

  deleteFile() {
    this.onDelete.emit(this.file._id);
  }

  renameFile() { };

}
