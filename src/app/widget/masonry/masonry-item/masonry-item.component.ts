import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-masonry-item',
  templateUrl: './masonry-item.component.html',
  styleUrls: ['./masonry-item.component.scss']
})
export class MasonryItemComponent implements OnInit {

  constructor(
    private elementRef: ElementRef<HTMLElement>
  ) { }

  ngOnInit() { }

  public get element() {
    return this.elementRef.nativeElement;
  }

}
