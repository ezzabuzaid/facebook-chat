import { Directive, OnInit, Input, Host, ElementRef, Renderer2 } from '@angular/core';
import { TableService } from '../table.service';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[semiTableFilter]'
})

export class TableFilterDirective implements OnInit {
  @Input() semiTableFilter: string;
  @Input() type: string = null;
  constructor(
    @Host() private tableService: TableService,
    public elRef: ElementRef<HTMLInputElement>,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.renderer.listen(
      this.elRef.nativeElement,
      this.type === 'text' ? 'keyup' : 'change',
      (event) => this.filter(event)
    );
  }

  filter({ target }) {
    const value = String(target.value).toLowerCase();
    this.tableService.search({
      key: this.semiTableFilter,
      token: value
    });
  }

  getValue() {
    return this.elRef.nativeElement.value;
  }

  getKey() {
    return this.semiTableFilter;
  }

}
