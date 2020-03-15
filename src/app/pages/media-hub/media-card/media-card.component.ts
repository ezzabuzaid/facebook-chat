import { Component, OnInit, Input } from '@angular/core';
import { MediaModel } from '@shared/models';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.scss']
})
export class MediaCardComponent implements OnInit {
  @Input() file: MediaModel.IFile;
  constructor() { }

  ngOnInit(): void {
  }

}
