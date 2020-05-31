import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IPromptPopup } from '../popup.manager';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent implements OnInit {
  public data: IPromptPopup = null;
  constructor(
    private readonly ref: MatDialogRef<any>
  ) { }

  ngOnInit() { }

  close() {
    this.ref.close(this.data.value.trim());
  }

}
