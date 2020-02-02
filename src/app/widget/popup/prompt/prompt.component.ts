import { Component, OnInit } from '@angular/core';
import { IPromptPopup } from '../popup.manager';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent implements OnInit {
  public result = '';
  public data: IPromptPopup = null;
  constructor(
  ) { }

  ngOnInit() { }

}
