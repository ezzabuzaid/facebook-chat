import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProgressBarManager } from './progress-bar.manager';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent implements OnInit {
  public $visible = this.progressBarManager.listen();

  constructor(
    private progressBarManager: ProgressBarManager
  ) { }

  ngOnInit() { }

}
