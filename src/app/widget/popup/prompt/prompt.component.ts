import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { IPromptPopup } from '../popup.service';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent implements OnInit {
  result = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IPromptPopup
  ) { }

  ngOnInit() {
  }

}
