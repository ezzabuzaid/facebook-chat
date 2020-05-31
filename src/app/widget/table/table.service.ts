import { Injectable, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class TableManager {
  private readonly _searchSubject: Subject<any> = new Subject();
  constructor() { }

  search(token: IColumnFilter) {
    this._searchSubject.next(token);
  }

  onSearch() {
    return this._searchSubject.asObservable();
  }

}

export interface IColumnSetting {
  type: string;
  key: string;
  list?: any[];
  template?: TemplateRef<any>
}

export interface IColumnFilter {
  key: string;
  value: string;
}