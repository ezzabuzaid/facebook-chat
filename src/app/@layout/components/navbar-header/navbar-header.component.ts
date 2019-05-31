import { Component, OnInit } from '@angular/core';
import { Logger } from '@core/utils';
const log = new Logger('Navbar Header');
@Component({
  selector: 'app-navbar-header',
  templateUrl: './navbar-header.component.html',
  styleUrls: ['./navbar-header.component.scss']
})
export class NavbarHeaderComponent implements OnInit {

  constructor() { }


  ngOnInit() { }

}
