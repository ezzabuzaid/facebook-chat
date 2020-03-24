import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MediaModel } from '@shared/models';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.scss']
})
export class MediaCardComponent implements OnInit {
  @Input() file: MediaModel.IFile;
  @Output() onMarkChange = new EventEmitter();
  @Input() checked = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleChecking() {
    this.onMarkChange.emit(this.file);
    this.checked = !this.checked;
  }

}
