import { Directive, Inject, Input, OnInit } from '@angular/core';
import { FilterTypes } from '../index';
import { TableComponent } from '../table-view/table-view.component';

@Directive({
  selector: 'semi-table table thead tr:first-child semi-table-head > th'
})

export class FilterableDirective implements OnInit {
  @Input() filterable: string = null;
  @Input() list: any[] = [];
  @Input() type: FilterTypes = 'text';

  constructor(
    @Inject(TableComponent) private readonly tableComponent: TableComponent,
  ) { }

  ngOnInit() {
    this.tableComponent.registerColumn({
      key: this.filterable,
      type: this.type || 'text',
      list: this.list
    });
  }

}
