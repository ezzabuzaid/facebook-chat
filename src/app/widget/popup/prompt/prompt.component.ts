import { Component, OnInit } from '@angular/core';
import { IPromptPopup } from '../popup.manager';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent implements OnInit {
  public data: IPromptPopup = null;
  constructor(
    private ref: MatDialogRef<any>
  ) { }

  ngOnInit() { }

  close() {
    this.ref.close(this.data.value);
  }

}
