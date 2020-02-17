import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'semi-table-head',
  template: '<ng-content></ng-content>'
})
export class TableHeadComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
