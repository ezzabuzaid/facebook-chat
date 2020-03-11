import { _extract } from '@shared/common';
import { Constants } from '@core/constants';
import { GenericCrudModel } from 'app/pages/generic-crud/generic-crud.model';
export class NavigationItem {
  type: 'item' | 'collapse';
  title: string;
  icon: string;
  routerLink?: string;
  children?: NavigationItem[];
  constructor(item: NavigationItem) {
    this.type = item.type;
    this.title = item.title;
    this.icon = item.icon;
    this.routerLink = item.routerLink;
    this.children = item.children;
  }
}


export default [
  new NavigationItem({
    routerLink: `${Constants.Routing.Users.withSlash}`,
    icon: 'person',
    title: _extract('navbar_users'),
    type: 'item'
  }),
  new NavigationItem({
    routerLink: `${Constants.Routing.MediaHub.withSlash}`,
    icon: 'folder',
    title: _extract('navbar_media'),
    type: 'item'
  }),
  new NavigationItem({
    routerLink: `${Constants.Routing.SESSIONS.withSlash}`,
    icon: 'assistant',
    title: _extract('navbar_sessions'),
    type: 'item'
  }),
];
