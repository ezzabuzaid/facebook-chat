import { Component, OnInit, ViewChild, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator, MatDialog } from '@angular/material';
import { ngTableSetting, listFilter } from '@shared/common';
import { AppUtils } from '@core/helpers/utils';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LocalDataSource, } from 'ng2-smart-table';
import { tap, takeUntil, map, switchMap, filter } from 'rxjs/operators';
import { GenericCrudModel } from '../generic-crud.model';

@Component({
  selector: 'app-generic-read',
  templateUrl: './generic-read.component.html',
  styleUrls: ['./generic-read.component.scss'],
})
export class GenericReadComponent implements OnInit, OnDestroy {
  @Input() public module = null;
  @Input() public endpoint = null;
  public source = new LocalDataSource();
  @ViewChild(MatPaginator, { static: true }) private paginator: MatPaginator;

  private _subscribtion = new Subject();

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  fetchData() {
    return this.http
      .configure({
        DEFAULT_URL: AppUtils.isFalsy(AppUtils.isNullorUndefined(this.module.endpoint))
      })
      .get<any[]>(this.endpoint || this.module.endpoint)
      .pipe(
        tap((response) => {
          this.paginator.length = response.length;
          this.source.load(response);
        })
      );
  }

  ngOnInit() {
    this.fetchData().subscribe(console.log);
    // this.paginator.page
    //   .pipe(
    //     takeUntil(this._subscribtion),
    //     map(({ pageSize: ItemsPerPage, pageIndex }) => ({ ItemsPerPage, Page: pageIndex + 1 })),
    //     switchMap((query) => this.fetchData(query))
    //   )
    //   .subscribe();
  }

  create() {
    this.router.navigate(['../', GenericCrudModel.Operations.CREATE], {
      relativeTo: this.route
    });
    // this.dialog.open(SettingCreateComponent)
    //   .afterClosed()
    //   .pipe(
    //     filter(item => !!item),
    //     takeUntil(this._subscribtion),
    //     switchMap(data => this.settingService.fetchSetting(data.id))
    //   )
    //   .subscribe(result => {
    //     this.source.append(result);
    //   });
  }

  edit({ data }) {
    this.router.navigate(['../', GenericCrudModel.Operations.UPDATE, data.id], {
      relativeTo: this.route
    });
    // this.dialog.open<SettingUpdateComponent, SettingModel.ISetting, SettingModel.ISetting>(SettingUpdateComponent, { data })
    //   .afterClosed()
    //   .pipe(
    //     filter(item => !!item),
    //     takeUntil(this._subscribtion),
    //     switchMap(() => this.settingService.fetchSetting(data.id))
    //   )
    //   .subscribe(result => {
    //     this.source.update(data, result);
    //   });
  }

  ngOnDestroy() {
    this._subscribtion.next();
    this._subscribtion.complete();
  }

}
