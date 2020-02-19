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
      .subscribe(() => {
        const tokens = this.tableFilterDirective
          .filter(token => {
            const value = token.getValue();
            return value !== '' || value !== null || value !== undefined;
          })
          .reduce((acc, field) => {
            acc[field.getKey()] = field.getValue();
            return acc;
          }, {});
        if (!AppUtils.isObjectEmpty(tokens)) {
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

  trackByFn(index: number, item: any) {
    return item.id || item._id || item.name || Object.keys(this.dataSource[0])[0] || item || index;
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  // search(value, keys) {
  //   if (value.length && this.dataSource.length) {
  //     const filterdData = [];
  //     for (const key of keys) {
  //       const sorted = this.dataSource.filter(el => {
  //         const dataValue = this.getValue(key, el);
  //         const dataType = typeof dataValue;
  //         if (dataType === 'string' || dataType === 'number') {
  //           const keyValue = String(dataValue).toLowerCase();
  //           return keyValue.indexOf(value) !== -1;
  //         }
  //         return false;
  //       });
  //       filterdData.push(...sorted);
  //     }
  //     const data = [...new Set(filterdData)];
  //     this.tableService.nextData(data);
  //   }
  // }


}
