import { Directive, HostListener, OnInit, Input, Host, Attribute, Inject, ElementRef } from '@angular/core';
import { TableService } from '../table.service';

@Directive({
  selector: '[semiTableFilter]'
})

export class TableFilterDirective implements OnInit {
  keys: string[] = [];
  @Input() set semiTableFilter(keys: string[]) {
    this.keys = keys;
  }
  constructor(
    @Host() private tableService: TableService,
  ) { }

  _dataSource = [];
  get dataSource() {
    // const data = this.tableService.dataSource;
    // return data;
    return this._dataSource;
  }
  set dataSource(data) {
    // this.tableService.dataSource = data;
    this._dataSource = data;
  }

  get lastDataSource() {
    return this.tableService.lastData;
  }

  set lastDataSource(data) {
    this.tableService.lastData = data;
  }

  ngOnInit() {

    this.tableService
      .castData()
      .pipe(
        // takeUntil(this._unsubscribe),
        // startWith(this.dataSource),
        // pairwise()
      )
      .subscribe(
        // ([prev, latest])
        data => {
          this.dataSource = data;
          // this.lastDataSource = prev;
        });
  }

  @HostListener('input', ['$event']) filter({ target }) {
    const value = String(target.value).toLowerCase();
    this.tableService.search({
      keys: this.keys,
      token: value
    });
    // if (value.length && this.dataSource.length) {
    //   const filterdData = [];
    //   for (const key of this.keys) {
    //     const sorted = this.dataSource.filter(el => {
    //       const dataValue = this.getValue(key, el);
    //       const dataType = typeof dataValue;
    //       if (dataType === 'string' || dataType === 'number') {
    //         const keyValue = String(dataValue).toLowerCase();
    //         return keyValue.indexOf(value) !== -1;
    //       }
    //       return false;
    //     });
    //     filterdData.push(...sorted);
    //   }
    //   const data = [...new Set(filterdData)];
    //   this.tableService.nextData(data);
    // } else {
    //   this.tableService.nextData(this.lastDataSource);
    //   console.log('lastDataSource:: ', this.lastDataSource);
    // }
  }

  getValue(name, obj) {
    return name.split('.').reduce((a, v) => a[v], obj);
  }


}
