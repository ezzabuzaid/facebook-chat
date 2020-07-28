import { ChangeDetectionStrategy, Component } from '@angular/core';
import { delay } from 'rxjs/operators';
import { ProgressBarManager } from './progress-bar.manager';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent {
  public visible = this.progressBarManager.listen().pipe(delay(0));

  constructor(
    private progressBarManager: ProgressBarManager
  ) { }

}
