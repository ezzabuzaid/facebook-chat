import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent implements OnInit {
  result = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string, description: string }
  ) { }

  ngOnInit() {
  }

}
