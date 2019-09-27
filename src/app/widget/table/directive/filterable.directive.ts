import { Directive, OnInit, Input, Inject, ElementRef, ChangeDetectorRef } from '@angular/core';
import { TableComponent } from '../table-view/table-view.component';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'semi-table table thead tr:first-child semi-table-head > th'
})

export class FilterableDirective implements OnInit {
  @Input() filterable: string = null;
  @Input() list: any[] = [];
  _type: string = null;
  @Input()
  get type() {
    return this._type;
  }
  set type(value) {
    this._type = value || 'text';
  }
  constructor(
    @Inject(TableComponent) private tableComponent: TableComponent,
  ) { }

  ngOnInit() {
    this.tableComponent.registerColumn({
      key: this.filterable,
      type: this.type || 'text',
      list: this.list
    });
  }

}
