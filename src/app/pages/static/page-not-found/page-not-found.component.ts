import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '@core/constants';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    // this.router.navigateByUrl(Constants.Routing.LOGIN.withSlash);
  }

}
