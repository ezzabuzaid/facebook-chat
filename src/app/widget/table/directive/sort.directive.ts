import { Directive, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { TableService } from '../table.service';


@Directive({
  selector: '[semiTableSort]'
})
export class TableSortDirective implements OnInit {
  private hasRotate = false;
  private headerValue: string;
  private iconSortToLisiten;
  private data;
  @Input() set appTableSort(headerValue: string) {
    const el = this.elRef.nativeElement;
    this.headerValue = headerValue;
    const value = this.render.createText(headerValue);
    const arrowIcon = this.iconSortToLisiten = this.render.createElement('mat-icon');
    const parentDiv = this.render.createElement('div');
    const div = this.render.createElement('div');
    const span = this.render.createElement('span');
    this.render.addClass(div, 'mx-2');
    this.render.addClass(div, 'd-flex');
    this.render.addClass(parentDiv, 'd-flex');
    this.render.addClass(parentDiv, 'align-items-center');
    const arrowText = this.render.createText('arrow_drop_up');
    this.render.addClass(arrowIcon, 'material-icons');
    this.render.appendChild(arrowIcon, arrowText);
    this.render.appendChild(div, arrowIcon);
    this.render.appendChild(span, value);
    this.render.appendChild(parentDiv, span);
    this.render.appendChild(div, arrowIcon);
    this.render.appendChild(parentDiv, div);
    this.render.appendChild(el, parentDiv);
  }

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private render: Renderer2,
    private tableService: TableService
  ) {
    const el = this.elRef.nativeElement;
    this.render.addClass(el, 'pointer');
    this.render.addClass(el, 'rotate-sort');
  }

  ngOnInit() {
    this.data = this.dataSource;
    const listenTo = this.iconSortToLisiten;
    this.render.listen(listenTo, 'click', () => {
      if (!this.hasRotate) {
        this.sort(this.headerValue, false);
        this.render.setStyle(listenTo, 'transform', 'rotate(180deg)');
      } else {
        this.sort(this.headerValue, true);
        this.render.setStyle(listenTo, 'transform', 'rotate(0deg)');
      }
      this.hasRotate = !this.hasRotate;
    });
  }

  get dataSource() {
    // return this.tableService.dataSource;
    return [];
  }

  compare(a, b, isAsc) {
    if (typeof a === 'number' && typeof b === 'number') {
      return (a - b) * (isAsc ? 1 : -1);
    } else {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }

  sort(key: string, isAsc) {
    this.data = this.data.sort((a, b) => {
      // bollean, for asc and desc | false mean desc | true asc
      return this.compare(a[key], b[key], isAsc);
    });
  }

}
