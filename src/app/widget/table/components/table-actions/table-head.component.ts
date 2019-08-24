import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'semi-table-head',
  template: '<ng-content></ng-content>',
  styleUrls: ['./table-head.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableHeadComponent implements OnInit {

  constructor(
    private cd: ChangeDetectorRef
  ) {
    this.cd.detach();
  }

  ngOnInit() {
  }

}
