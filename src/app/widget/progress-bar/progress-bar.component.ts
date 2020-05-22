import { Component, OnInit } from '@angular/core';
import { ProgressBarManager } from './progress-bar.manager';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  public $visible = this.progressBarManager.listen().pipe(delay(0));
  constructor(
    private progressBarManager: ProgressBarManager
  ) { }

  ngOnInit() { }

}
