import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { AppUtils } from '@core/helpers/utils';
import { PaginationQuery } from '@shared/models';
import { tap } from 'rxjs/operators';
import { DataGrid, DisplayColumn, EColumnTypes } from './column';

@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatagridComponent implements AfterViewInit, OnChanges {
  @Input() dataGrid: DataGrid<any> = null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = [];
  EColumnTypes = EColumnTypes;
  lock = false;
  displayColumns = [];


  sortData(event: Sort) {
    this.fetchData(new PaginationQuery(0, 20, { [event.active]: event.direction }))
  }

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
    this.fetchData(new PaginationQuery(0, 20));
  }

  onPaginate(event: PageEvent) {
    this.fetchData(new PaginationQuery(event.pageIndex, event.pageSize));
  }

  fetchData(query: PaginationQuery<any>) {
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
