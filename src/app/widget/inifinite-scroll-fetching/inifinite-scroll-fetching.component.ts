import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ListEntityQuery, ListEntityRes } from '@shared/models';
import { Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { AppUtils } from '@core/helpers/utils';

@Component({
  selector: 'app-inifinite-scroll-fetching',
  templateUrl: './inifinite-scroll-fetching.component.html',
  styleUrls: ['./inifinite-scroll-fetching.component.scss']
})
export class InifiniteScrollFetchingComponent implements OnInit {
  private isLastFetchDone = false;
  private currentLength = -1;
  @Output() public dataChange = new EventEmitter();
  @Input() public provider: (query: ListEntityQuery) => Observable<ListEntityRes<any>>;
  @Input() public scrollContainerSelector: string = null;
  @Input() public enable = true;
  @Input() public fetchOnInit = true;
  @Input('query') public lastQuery = new ListEntityQuery({ ItemsPerPage: 10, Page: 1 });
  @Input() public direction: 'up' | 'down' = 'down';

  constructor() { }

  private fetchItems() {
    this.provider(this.lastQuery)
      .pipe(
        map(({ items }) => items),
        tap((items) => {
          this.currentLength = items.length;
          this.lastQuery.Page += 1;
          this.isLastFetchDone = true;
          console.log(items);
        }),
      )
      .subscribe((items) => {
        this.dataChange.emit(items);
      });
  }

  public populateItems() {
    if (this.enable && this.isLastFetchDone) {
      this.isLastFetchDone = false;
      this.fetchItems();
    }
  }


  onScroll(direction) {
    console.log(direction);
    if (this.direction === direction) {
      this.populateItems();
    }
  }

  ngOnInit() {
    if (this.fetchOnInit) {
      this.fetchItems();
    } else {
      this.isLastFetchDone = true;
    }
  }

  restart() {
    this.isLastFetchDone = false;
    this.lastQuery = new ListEntityQuery({ ItemsPerPage: 10, Page: 1 });
    this.currentLength = -1;
  }
}

