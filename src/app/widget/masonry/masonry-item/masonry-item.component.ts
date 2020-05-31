import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-masonry-item',
  templateUrl: './masonry-item.component.html',
  styleUrls: ['./masonry-item.component.scss']
})
export class MasonryItemComponent implements OnInit {

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>
  ) { }

  ngOnInit() { }

  public get element() {
    return this.elementRef.nativeElement;
  }

}
