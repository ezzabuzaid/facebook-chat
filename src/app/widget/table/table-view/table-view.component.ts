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
import { TableService } from '../table.service';
import { TableActionsComponent } from '../table-actions/table-actions.component';
import { Subject } from 'rxjs';
import { TableFilterDirective } from '../directive/filter.directive';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'semi-table',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
  viewProviders: [TableService]
})
export class TableComponent implements OnInit, AfterContentInit, OnDestroy {
  private _dataSource = [];
  private _tempDataSource = [];
  private locked = false;

  public filterableColumns: { key: string, type: string, list: { name: string, value: string }[] }[] = [];

  private _unsubscribe = new Subject();

  @Input() nativeTableClass: string = null;

  @ContentChild(TemplateRef, { static: false }) tableBody;

  @ContentChild(TableActionsComponent, { read: TableActionsComponent, static: false }) actionsComponent: TableActionsComponent;
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

  registerColumn(columnSetting) {
    if (!this.locked) {
      this.filterableColumns.push(columnSetting);
    }
  }

  constructor(
    private tableService: TableService,
  ) { }

  ngOnInit() {
    const toLowerCase = value => String(value).toLowerCase();
    this.tableService.onSearch()
      .subscribe(() => {
        const tokens = this.tableFilterDirective
          .filter(token => !!token.getValue())
          .reduce((acc, field) => {
            acc[field.getKey()] = field.getValue();
            return acc;
          }, {});
        if (!this.isObjectEmpty(tokens)) {
          this._dataSource = this._tempDataSource.filter((row) => {
            return Object.keys(tokens)
              .every(column => toLowerCase(this.getDottedValue(column, row)).includes(toLowerCase(tokens[column])));
          });
        } else {
          this._dataSource = this._tempDataSource;
        }
      });
  }

  ngAfterContentInit() {
    this.locked = true;
    if (this.actionsComponent) {
      if (this.actionsComponent.position === 'start') {
        this.filterableColumns.shift();
      }
    }
  }

  trackByFn(index, item) {
    const by = item.id || item.name || Object.keys(this.dataSource)[0] || item || index;
    return by;
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }


  isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
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

  getDottedValue(name, obj) {
    return name.split('.').reduce((a, v) => a[v], obj);
  }

}
