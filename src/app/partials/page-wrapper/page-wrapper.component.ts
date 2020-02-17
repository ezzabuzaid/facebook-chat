import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styleUrls: ['./page-wrapper.component.scss']
})
export class PageWrapperComponent implements OnInit {
  @Input() title: string = null;

  constructor() { }

  ngOnInit(): void {
  }

}
