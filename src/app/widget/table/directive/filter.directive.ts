import { Directive, OnInit, Input, Host, ElementRef, Renderer2 } from '@angular/core';
import { TableManager } from '../table.service';

@Directive({
  selector: '[semiTableFilter]'
})

export class TableFilterDirective implements OnInit {
  @Input() semiTableFilter: string;
  @Input() type: string = null;

  constructor(
    @Host() private tableService: TableManager,
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
    this.tableService.search({
      key: this.semiTableFilter,
      value: String(target.value).toLowerCase()
    });
  }

  getValue() {
    return this.elRef.nativeElement.value;
  }

  getKey() {
    return this.semiTableFilter;
  }

}
