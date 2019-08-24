import { Component, OnInit, Input, ElementRef, HostBinding } from '@angular/core';

@Component({
  selector: 'app-navbar-collapse',
  templateUrl: './navbar-collapse.component.html',
  styleUrls: ['./navbar-collapse.component.scss'],
})
export class NavbarCollapseComponent implements OnInit {
  @Input() item;
  // not working, query why
  @HostBinding('class.expanded') expanded = false;
  constructor(
    private elRef: ElementRef<HTMLElement>
  ) { }

  ngOnInit() { }

  expand() {
    this.expanded = !this.expanded;
    this.elRef.nativeElement.classList.toggle('expanded');
  }

}
