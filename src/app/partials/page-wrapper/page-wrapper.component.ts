import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styleUrls: ['./page-wrapper.component.scss'],
  host: {
    class: 'd-block h-100 w-100'
  }
})
export class PageWrapperComponent implements OnInit {
  @Input() title: string = null;

  constructor() { }

  ngOnInit(): void {
  }

}
