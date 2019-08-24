import { Injectable } from '@angular/core';
import { SidebarComponent } from './sidebar.component';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  sidebarList: { name: string, sidebar: SidebarComponent }[] = [];
  constructor() { }

  registerSidebar(name: string, sidebar: SidebarComponent) {
    this.sidebarList.push({ name, sidebar });
  }

  unregisterSidebar(name) {
    const index = this.sidebarList.findIndex(el => el.name === name);
    this.sidebarList.splice(index, 1);
  }

  getSidebar(name) {
    const sidebarWrapper = this.sidebarList.find(el => el.name === name);
    return sidebarWrapper && sidebarWrapper.sidebar;
  }

}

export enum RegisterdSidebar {
  NAVBAR = 'navbar',
}
