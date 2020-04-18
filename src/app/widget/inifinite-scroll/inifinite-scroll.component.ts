import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ListEntityQuery, ListEntityResponse } from '@shared/models';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-inifinite-scroll',
  templateUrl: './inifinite-scroll.component.html',
  styleUrls: ['./inifinite-scroll.component.scss']
})
export class InifiniteScrollingComponent implements OnInit {
  private isLastFetchDone = false;
  private currentLength = -1;
  @Output() public dataChange = new EventEmitter();
  @Input() public provider: (query: ListEntityQuery) => Observable<ListEntityResponse<any>>;
  @Input() public scrollContainerSelector: string | HTMLElement = null;
  @Input() public enable = true;
  @Input('query') public lastQuery = new ListEntityQuery({ page: 0, size: 10 });

  @Input() public direction: 'up' | 'down' = 'down';
  /**
   * If true the provider will be used inside {ngOnInit} lifecycle
   */
  @Input() public fetchOnInit = true;

  constructor() { }

  ngOnInit() {
    if (this.fetchOnInit) {
      this.fetchItems();
    } else {
      this.isLastFetchDone = true;
    }
  }

  private fetchItems() {
    this.provider(this.lastQuery)
      .pipe(
        map(({ list }) => list),
        tap((items) => {
          this.currentLength = items.length;
          this.lastQuery.page += 1;
          this.isLastFetchDone = true;
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
    if (this.direction === direction) {
      this.populateItems();
    }
  }

  restart(enable = true) {
    this.isLastFetchDone = true;
    this.lastQuery = new ListEntityQuery({ page: 1, size: 10 });
    this.currentLength = -1;
    this.enable = enable;
    this.populateItems();
  }
}

