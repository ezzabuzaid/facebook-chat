import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  ChangeDetectionStrategy,
  ContentChild,
  AfterContentInit,
  OnDestroy,
  ViewChildren,
  QueryList,
  TrackByFunction,
} from '@angular/core';
import { TableManager, IColumnSetting } from '../table.service';
import { TableActionComponent } from '../table-actions/table-actions.component';
import { Subject } from 'rxjs';
import { TableFilterDirective } from '../directive/filter.directive';
import { AppUtils } from '@core/helpers/utils';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'semi-table',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
  viewProviders: [TableManager]
})
export class TableComponent implements OnInit, AfterContentInit, OnDestroy {
  private _dataSource: any[] = [];
  private _tempDataSource: any[] = [];
  private locked = false;

  public filterableColumns: IColumnSetting[] = [];

  private _unsubscribe = new Subject();

  @Input() nativeTableClass: string = null;
  @Input() dense: boolean = true;
  @Input() trackByFn: TrackByFunction<any> = null;

  @ContentChild(TemplateRef) tableBody: any;

  @ContentChild(TableActionComponent, { read: TableActionComponent }) public actionComponent: TableActionComponent;
  @ViewChildren(TableFilterDirective) tableFilterDirective: QueryList<TableFilterDirective>;

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

  registerColumn(columnSetting: IColumnSetting) {
    if (!this.locked) {
      this.filterableColumns.push(columnSetting.key ? columnSetting : null);
    }
  }

  constructor(
    private tableManager: TableManager,
  ) { }

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
