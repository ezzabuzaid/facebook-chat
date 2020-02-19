import { Directive, OnInit, Input, Host, ElementRef, Renderer2 } from '@angular/core';
import { TableManager } from '../table.service';

@Directive({
  selector: '[tableFilter]'
})

export class TableFilterDirective implements OnInit {
  @Input() tableFilter: string;
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
      key: this.tableFilter,
      value: String(target.value).toLowerCase()
    });
  }

  getValue() {
    const element = this.elRef.nativeElement;
    switch (this.type) {
      case 'checkbox':
        return element.checked;
      default:
        return element.value;
    }
  }

  getKey() {
    return this.tableFilter;
  }

}
