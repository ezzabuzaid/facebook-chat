import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'semi-table-actions',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableActionComponent implements OnInit {
  @Input() position: 'start' | 'end' = 'start';
  // TODO: append th that respects the position
  @Input() title = '';

  constructor() { }

  ngOnInit() {
  }

}
