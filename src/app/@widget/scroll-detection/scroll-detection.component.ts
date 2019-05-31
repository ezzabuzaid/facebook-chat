import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-scroll-detection',
  templateUrl: './scroll-detection.component.html',
  styleUrls: ['./scroll-detection.component.scss']
})
export class ScrollDetectionComponent implements OnInit {
  @Output() WhenBottomReach = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  whenBottomReach() {
    this.WhenBottomReach.emit();
  }

}
