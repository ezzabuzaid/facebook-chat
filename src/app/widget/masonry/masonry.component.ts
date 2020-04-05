import { Component, OnInit, ElementRef, Input, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { MasonryItemComponent } from './masonry-item/masonry-item.component';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-masonry',
  templateUrl: './masonry.component.html',
  styleUrls: ['./masonry.component.scss']
})
export class MasonryComponent implements OnInit, AfterContentInit {
  @Input() gridGap: string = '1rem';

  @ContentChildren(MasonryItemComponent) items: QueryList<MasonryItemComponent>;

  constructor(
    private elementRef: ElementRef<HTMLElement>
  ) { }

  ngOnInit() { }

  ngAfterContentInit() {
    this.element.style.setProperty('gap', this.gridGap);
    this.items.changes.subscribe((data) => {
      const masonryItems = this.items.toArray();
      /**
       * Set appropriate spanning to any masonry item
       *
       * Get different properties we already set for the masonry, calculate 
       * height or spanning for any cell of the masonry grid based on its 
       * content-wrapper's height, the (row) gap of the grid, and the size 
       * of the implicit row tracks.
       *
       * @param item Object A brick/tile/cell inside the masonry
       */
      const resizeMasonryItem = (item: MasonryItemComponent) => {
        /* Get the grid object, its row-gap, and the size of its implicit rows */
        const computedElementStyle = window.getComputedStyle(this.element);
        const rowGap = parseInt(computedElementStyle.getPropertyValue('row-gap'));
        const rowHeight = parseInt(computedElementStyle.getPropertyValue('grid-auto-rows'));
        /*
         * Spanning for any brick = S
         * Grid's row-gap = G
         * Size of grid's implicitly create row-track = R
         * Height of item content = H
         * Net height of the item = H1 = H + G
         * Net height of the implicit row-track = T = G + R
         * S = H1 / T
         */
        const itemContent = item.element.querySelector('.masonry-content');
        const rowSpan = Math.ceil((itemContent.clientHeight + rowGap) / (rowHeight + rowGap));

        /* Set the spanning as calculated above (S) */
        item.element.style.gridRowEnd = 'span ' + rowSpan;
      }
      /**
   * Apply spanning to all the masonry items
   *
   * Loop through all the items and apply the spanning to them using 
   * `resizeMasonryItem()` function.
   *
   * @uses resizeMasonryItem
   */
      const resizeAllMasonryItems = () => {
        // Get all item class objects in one list

        /*
         * Loop through the above list and execute the spanning function to
         * each list-item (i.e. each masonry item)
         */
        for (let i = 0; i < masonryItems.length; i++) {
          const imgs = masonryItems[i].element.querySelectorAll('img');
          this.imagesLoaded(Array.from(imgs)).subscribe(() => {
            resizeMasonryItem(masonryItems[i]);
          });
        }
      }
      /**
       * Resize the items when all the images inside the masonry grid 
       * finish loading. This will ensure that all the content inside our
       * masonry items is visible.
       *
       * @uses resizeMasonryItem
       */

      /* Resize all the grid items on the load and resize events */
      var masonryEvents = ['load', 'resize'];
      masonryEvents.forEach(function (event) {
        window.addEventListener(event, resizeAllMasonryItems);
      });
      resizeAllMasonryItems();
    })
  }


  public get element() {
    return this.elementRef.nativeElement;
  }

  imagesLoaded(imgs: HTMLImageElement[]) {
    return new Observable((subscriber) => {
      // const imgs = this.element.querySelectorAll('img');
      const totalImages = imgs.length;
      let counter = 0;
      const incrementCounter = () => {
        counter++;
        if (counter === totalImages) {
          subscriber.next();
          subscriber.complete();
        }
      }
      imgs.forEach((img) => {
        if (img.complete)
          incrementCounter();
        else {
          img.addEventListener('load', incrementCounter, false);
        };
      });
    });
  }
}
