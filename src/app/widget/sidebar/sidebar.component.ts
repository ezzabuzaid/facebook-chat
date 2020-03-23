import { Component, OnInit, ElementRef, ViewChild, OnDestroy, Input, HostBinding } from '@angular/core';
import { Subject } from 'rxjs';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input()
  @HostBinding('class.toggled')
  public toggled = false;
  @ViewChild('panel') public drawer: ElementRef<HTMLElement>;
  @Input() public name = '';

  private onToggle = new Subject<ISidebarToggle>();
  private _subscribtion = new Subject();

  constructor(
    private sidebarService: SidebarService,
  ) { }

  ngOnInit() {
    this.sidebarService.registerSidebar(this.name, this);
  }


  toggle(value = !this.toggled) {
    this.toggled = value;
    this.onToggle.next({ toggle: this.toggled });
  }

  open() {
    this.toggle(false);
  }

  close() {
    this.toggle(true);
  }

  listen() {
    return this.onToggle.asObservable();
  }

  ngOnDestroy() {
    this._subscribtion.next();
    this._subscribtion.complete();
  }

}
interface ISidebarToggle {
  toggle: boolean;
}
