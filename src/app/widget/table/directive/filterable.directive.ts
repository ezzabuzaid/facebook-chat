import { Directive, OnInit, Input, Inject, ElementRef, ChangeDetectorRef } from '@angular/core';
import { TableComponent } from '../components/table-view/table-view.component';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'semi-table table thead tr:first-child semi-table-head > th'
})

export class FilterableDirective implements OnInit {
  @Input() filterable: string = null;
  constructor(
    @Inject(TableComponent) private tableComponent: TableComponent,
  ) { }

  ngOnInit() {
    this.tableComponent.registerColumn(this.filterable);
  }

}
