import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ContentChild,
  AfterContentInit,
  OnDestroy,
} from '@angular/core';
import { TableService } from '../../table.service';
import { TableActionsComponent } from '../table-actions/table-actions.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'semi-table',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [TableService]
})
export class TableComponent implements OnInit, AfterContentInit, OnDestroy {
  private _dataSource = [];
  private locked = false;

  public columns = [];

  private _unsubscribe = new Subject;

  @Input() classes: string = null;

  @ContentChild(TemplateRef) tableBody;

  @ContentChild(TableActionsComponent, { read: TableActionsComponent }) actionsComponent: TableActionsComponent;

  @Input('dataSource')
  set dataSource(data) {
    this.tableService.dataSource = data;
    this._dataSource = data;
  }
  get dataSource(): any[] {
    return this._dataSource;
  }

  registerColumn(column) {
    if (!this.locked) {
      this.columns.push(column);
    }
  }

  constructor(
    private cd: ChangeDetectorRef,
    private tableService: TableService,
  ) { }


  set lastDataSource(data) {
    this.tableService.lastData = data;
  }

  ngOnInit() {
    this.tableService
      .castData()
      .pipe(
        takeUntil(this._unsubscribe)
      )
      .subscribe(([prev, latest]) => {
        this.dataSource = latest;
        this.lastDataSource = prev;
      });

    this.tableService.onSearch()
      .subscribe(token => {
      });
  }

  ngAfterContentInit() {
    this.locked = true;
    if (this.actionsComponent) {
      if (this.actionsComponent.position === 'start') {
        this.columns.shift();
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

  search(value, keys) {
    if (value.length && this.dataSource.length) {
      const filterdData = [];
      for (const key of keys) {
        const sorted = this.dataSource.filter(el => {
          const dataValue = this.getValue(key, el);
          const dataType = typeof dataValue;
          if (dataType === 'string' || dataType === 'number') {
            const keyValue = String(dataValue).toLowerCase();
            return keyValue.indexOf(value) !== -1;
          }
          return false;
        });
        filterdData.push(...sorted);
      }
      const data = [...new Set(filterdData)];
      this.tableService.nextData(data);
    }
  }

  getValue(name, obj) {
    return name.split('.').reduce((a, v) => a[v], obj);
  }

}
