import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ListEntityQuery } from '@shared/models';
import { Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-inifinite-scroll-fetching',
  templateUrl: './inifinite-scroll-fetching.component.html',
  styleUrls: ['./inifinite-scroll-fetching.component.scss']
})
export class InifiniteScrollFetchingComponent implements OnInit {
  private isLastFetchDone = false;
  private lastQuery = new ListEntityQuery({ ItemsPerPage: 10, Page: 1 });
  private currentLength = -1;
  @Output() private dataChange = new EventEmitter();
  @Input() private provider: (query: ListEntityQuery) => Observable<any>;
  @Input() scrollContainerSelector;

  constructor() { }

  public fetchUsers() {
    this.provider(this.lastQuery)
      .pipe(
        map(({ items }) => items),
        filter((items) => (this.currentLength !== items.length)),
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

  public scrolledDown() {
    if (this.isLastFetchDone) {
      this.isLastFetchDone = false;
      this.fetchUsers();
    }
  }

  ngOnInit() {
    this.fetchUsers();
  }

}

