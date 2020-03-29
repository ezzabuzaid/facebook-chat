import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { MediaModel } from '@shared/models';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.scss']
})
export class MediaCardComponent implements OnInit {
  @Input() file: MediaModel.IFile;
  @Output() onMarkChange = new EventEmitter();
  @Input()
  @HostBinding('class.checked')
  checked = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleChecking() {
    this.onMarkChange.emit(this.file);
    this.checked = !this.checked;
  }

  formatType(type) {
    return type.split('/')[1];
  }

  get isImage() {
    return [
      'image/jpg', 'image/JPG', 'image/jpeg', 'image/JPEG',
      'image/png', 'image/PNG', 'image/gif', 'image/GIF',
    ].includes(this.file.type);
  }

}
