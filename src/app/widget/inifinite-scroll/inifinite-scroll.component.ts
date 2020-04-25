import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, AfterContentInit } from '@angular/core';
import { ListEntityQuery, ListEntityResponse } from '@shared/models';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppUtils } from '@core/helpers/utils';

@Component({
  selector: 'app-inifinite-scrolling',
  templateUrl: './inifinite-scroll.component.html',
  styleUrls: ['./inifinite-scroll.component.scss']
})
export class InifiniteScrollingComponent implements OnInit, OnDestroy {
  private isLastFetchDone = true;
  private subscription: Subscription = null;
  private currentLength = -1;

  /**
   * An event emitted whenever data is available
   */
  @Output() public dataChange = new EventEmitter();

  /**
   * Data provider function
   */
  @Input() public provider: (query: ListEntityQuery) => Observable<ListEntityResponse<any>>;

  /**
   * The parent selector, usually the selector of the element that has scrolling 
   * @required
   */
  @Input() public scrollContainerSelector: string | HTMLElement = null;

  /**
   * The query to use for getting the data
   */
  @Input('query') public lastQuery = new ListEntityQuery({ page: 0, size: 10 });

  /**
   * Weather should fetch data or not
   * @default true
   */
  @Input() public enable = true;

  /**
   * @default 'down'
   */
  @Input() public direction: 'up' | 'down' = 'down';
  /**
   * If true the provider will be used inside {ngOnInit} lifecycle
   * @default true
   */
  @Input() public fetchOnInit = true;
  /**
   * Indicate in which direction should the fetching done
   * @default false
   */
  @Input() horizontal = false;


  constructor() { }

  ngOnInit() {
    if (this.fetchOnInit) {
      this.populateItems();
    } else {
      this.isLastFetchDone = true;
    }
  }

  private fetchItems() {
    this.subscription = this.provider(this.lastQuery)
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
      this.unsubscribe();
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
    this.lastQuery = new ListEntityQuery({ page: 0, size: 10 });
    this.currentLength = -1;
    this.enable = enable;
    this.populateItems();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  private unsubscribe() {
    this.subscription && this.subscription.unsubscribe();
  }

}

