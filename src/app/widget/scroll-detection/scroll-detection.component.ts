import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-scroll-detection',
  templateUrl: './scroll-detection.component.html',
  styleUrls: ['./scroll-detection.component.scss']
})
export class ScrollDetectionComponent implements OnInit {
  @Output() public onScroll = new EventEmitter();
  @Input() public scrollContainerSelector: string | HTMLElement;
  @Input() horizontal = false;
  constructor() { }

  ngOnInit() { }

  scroll(direction: 'up' | 'down') {
    this.onScroll.emit(direction);
  }

}
