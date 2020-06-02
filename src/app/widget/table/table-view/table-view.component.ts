import { AfterContentInit, Component, ContentChild, Input, OnDestroy, OnInit, QueryList, TemplateRef, TrackByFunction, ViewChildren } from '@angular/core';
import { AppUtils } from '@core/helpers/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TableFilterDirective } from '../directive/filter.directive';
import { TableActionComponent } from '../table-actions/table-actions.component';
import { IColumnSetting, TableManager } from '../table.service';

@Component({
  selector: 'semi-table',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
  viewProviders: [TableManager]
})
export class TableComponent implements OnInit, AfterContentInit, OnDestroy {

  @Input()
  get dataSource() {
    return this._dataSource;
  }
  set dataSource(list) {
    if (Array.isArray(list)) {
      this._tempDataSource = list;
      this._dataSource = list;
    }
  }
  private _dataSource: any[] = [];
  private _tempDataSource: any[] = [];
  private locked = false;

  private readonly _unsubscribe = new Subject();

  public filterableColumns: IColumnSetting[] = [];

  @Input() nativeTableClass: string = null;
  @Input() dense = true;
  @Input() trackByFn: TrackByFunction<any> = null;

  @ContentChild(TemplateRef) tableBody: any;

  @ContentChild(TableActionComponent, { read: TableActionComponent }) public actionComponent: TableActionComponent;
  @ViewChildren(TableFilterDirective) tableFilterDirective: QueryList<TableFilterDirective>;

  constructor(
    private readonly tableManager: TableManager,
  ) { }

  registerColumn(columnSetting: IColumnSetting) {
    if (!this.locked) {
      this.filterableColumns.push(columnSetting.key ? columnSetting : null);
    }
  }

  ngOnInit() {
    const toLowerCase = (value: string) => String(value).toLowerCase();
    this.tableManager.onSearch()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((value) => {
        const tokens = this.tableFilterDirective
          .filter(token => AppUtils.pipe(AppUtils.isFalsy, AppUtils.isNullorUndefined, AppUtils.isEmptyString)(token.getValue()))
          .reduce((acc, field) => {
            acc[field.getKey()] = field.getValue();
            return acc;
          }, {});
        if (AppUtils.hasItemWithin(tokens)) {
          this._dataSource = this._tempDataSource.filter((row) => {
            return Object.keys(tokens)
              .every(column => toLowerCase(AppUtils.getDottedProperty(column, row)).includes(toLowerCase(tokens[column])));
          });
        } else {
          this._dataSource = this._tempDataSource;
        }
      });
  }

  ngAfterContentInit() {
    this.locked = true;
    if (this.actionComponent) {
      if (this.actionComponent.position === 'start') {
        this.filterableColumns.shift();
      }
    }
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }


}
