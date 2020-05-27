import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { DisplayColumns } from '@shared/common';
import { Observable } from 'rxjs';
import { ListEntityResponse, ListEntityQuery } from '@shared/models';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.scss']
})
export class DatagridComponent implements OnInit, AfterViewInit {
  @Input() columns: DisplayColumns<any> = [];
  @Input() provider: (query: ListEntityQuery) => Observable<ListEntityResponse<any>>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = [];

  constructor() { }

  ngOnInit() {
    this.fetchData({ page: 0, size: 10 })
  }

  ngAfterViewInit() {
    this.fetchData({ page: 0, size: 10 })
  }

  onPaginate(event: PageEvent) {
    this.fetchData({ page: event.pageIndex, size: event.pageSize })
  }

  fetchData(query: ListEntityQuery) {
    return this.provider(query)
      .pipe(tap(data => {
        this.dataSource = data.list;
        this.paginator.length = data.totalCount;
      }))
      .subscribe()
  }

  get displayColumns() {
    return this.columns.map(column => column.key);
  }

}
