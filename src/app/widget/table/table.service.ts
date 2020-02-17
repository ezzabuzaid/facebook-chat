import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class TableManager {
  private readonly _search: Subject<any> = new Subject();
  constructor() { }

  search(token: any) {
    this._search.next(token);
  }

  onSearch() {
    return this._search.asObservable();
  }

}

export interface IColumnSetting {
  type: string;
  key: string;
  list: any[]
}