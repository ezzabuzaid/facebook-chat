import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class TableService {
  private readonly _search: Subject<any> = new Subject();
  constructor() { }

  search(token: any) {
    this._search.next(token);
  }

  onSearch() {
    return this._search.asObservable();
  }

}
