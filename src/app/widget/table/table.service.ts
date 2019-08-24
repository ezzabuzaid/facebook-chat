import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { scan, startWith } from 'rxjs/operators';

@Injectable()
export class TableService<T = any> {
  private _dataSource: T[] = [];
  lastData: T[] = [];
  private readonly data: Subject<any> = new Subject();
  private readonly _search: Subject<any> = new Subject();

  constructor() { }

  castData(): Observable<T> {
    return this.data.asObservable();
  }

  get dataSource(): T[] {
    return this._dataSource;
  }

  set dataSource(data: T[]) {
    this._dataSource = data;
  }

  nextData(data: T[]) {
    return this.data.next(data);
  }

  search(token) {
    this._search.next(token);
  }

  onSearch() {
    return this._search.asObservable()
      .pipe(
        startWith([]),
        scan((tokens, token) => {
          tokens.push(token);
          return tokens;
        }));
  }

}
