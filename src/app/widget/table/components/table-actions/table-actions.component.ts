import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'semi-table-actions',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableActionsComponent implements OnInit {
  @Input() position: 'start' | 'end' = 'start';
  constructor() { }

  ngOnInit() {
  }

}
