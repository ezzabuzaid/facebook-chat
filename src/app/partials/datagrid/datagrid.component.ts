import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AppUtils } from '@core/helpers/utils';
import { tap } from 'rxjs/operators';
import { DataGrid, DisplayColumn, EColumnTypes } from './column';

@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatagridComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() dataGrid: DataGrid<any> = null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = [];
  EColumnTypes = EColumnTypes;
  lock = false;
  displayColumns = [];
  constructor(
    private cdf: ChangeDetectorRef
  ) { }

  ngOnInit() { }
  ngOnChanges() {
    if (AppUtils.not(this.lock) && this.dataGrid) {
      this.lock = true;
      this.displayColumns = this.dataGrid?.columns?.map(column => column.key);
      if (this.dataGrid.actionColumn) {
        this.displayColumns[this.dataGrid.actionColumn.position === 'end' ? 'push' : 'unshift']('actions');
      }
    }
  }

  ngAfterViewInit() {
    this.fetchData({ page: 0, size: 20 });
  }

  onPaginate(event: PageEvent) {
    this.fetchData({ page: event.pageIndex, size: event.pageSize });
  }

  fetchData(query) {
    return this.dataGrid?.provider(query)
      .pipe(tap(data => {
        this.dataSource = data.list;
        this.paginator.length = data.totalCount;
      }))
      .subscribe();
  }

  // get displayColumns() {
  //   const columns = this.dataGrid?.columns?.map(column => column.key) as string[];
  //   if (this.dataGrid.actionColumn) {
  //     columns.push('actions');
  //   }
  //   this.ready = true;
  //   return columns;
  // }

  resolveValue(column: DisplayColumn<any>, row) {
    if (AppUtils.notNullOrUndefined(column.mapper)) {
      return column.mapper(row);
    } else if (AppUtils.isNullorUndefined(row[column.key])) {
      return 'Unavailable';
    }
    return row[column.key];
  }

}
