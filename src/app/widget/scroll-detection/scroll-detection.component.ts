import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-scroll-detection',
  templateUrl: './scroll-detection.component.html',
  styleUrls: ['./scroll-detection.component.scss']
})
export class ScrollDetectionComponent implements OnInit {
  @Output() public scrolledUp = new EventEmitter();
  @Output() public scrolledDown = new EventEmitter();
  @Input() public scrollContainerSelector: string;
  constructor() { }

  ngOnInit() {
  }


}
