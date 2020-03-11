import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-media-hub-folders',
  templateUrl: './media-hub-folders.component.html',
  styleUrls: ['./media-hub-folders.component.scss']
})
export class MediaHubFoldersComponent implements OnInit {
  folders = [{ name: 'test folder', updated: Date.now() }]
  constructor() { }

  ngOnInit(): void {
  }

}
