import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DisplayColumns } from '@shared/common';
import { ListEntityQuery, ListEntityResponse } from '@shared/models';
import { Observable } from 'rxjs';
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
