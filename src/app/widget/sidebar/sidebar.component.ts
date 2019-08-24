import { Component, OnInit, ElementRef, ViewChild, OnDestroy, Input, HostBinding } from '@angular/core';
import { Subject } from 'rxjs';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  @ViewChild('panel', { static: false }) public drawer: ElementRef<HTMLElement>;
  @Input() public name = '';
  public onToggle = new Subject<ISidebarToggle>();
  private _subscribtion = new Subject();
  @HostBinding('class.toggled') public toggled = false;
  constructor(
    private sidebarService: SidebarService,
  ) { }

  ngOnInit() {
    this.sidebarService.registerSidebar(this.name, this);
  }


  toggleSidebar() {
    this.toggled = !this.toggled;
  }

  ngOnDestroy() {
    this._subscribtion.next();
    this._subscribtion.complete();
  }

}
interface ISidebarToggle {
  toggle: boolean;
}
