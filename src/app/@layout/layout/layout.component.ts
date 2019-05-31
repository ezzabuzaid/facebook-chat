import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { routerAnimation } from '@shared/animation';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [routerAnimation],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData.state;
  }

  getState(outlet) {
    return outlet && outlet.activatedRouteData.state;
  }
}
