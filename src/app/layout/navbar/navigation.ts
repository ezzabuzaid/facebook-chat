import { _extract } from '@shared/common';
import { Constants } from '@core/constants';
import { GenericCrudModel } from 'app/pages/generic-crud/generic-crud.model';
export class NavigationItem {
  type: 'item' | 'collapse';
  title: string;
  icon: string;
  routerLink?: string;
  children?: NavigationItem[];
  queryParams?= null;
  constructor(item: NavigationItem) {
    this.type = item.type;
    this.title = item.title;
    this.icon = item.icon;
    this.routerLink = item.routerLink;
    this.children = item.children;
    this.queryParams = item.queryParams;
  }
}


export default [
  new NavigationItem({
    routerLink: `${Constants.Routing.HOME.withSlash}`,
    icon: 'home',
    title: _extract('navbar_home'),
    type: 'item'
  }),
  new NavigationItem({
    routerLink: `${Constants.Routing.Users.withSlash}`,
    icon: 'person',
    title: _extract('navbar_users'),
    type: 'item'
  }),
  new NavigationItem({
    icon: 'folder',
    title: _extract('navbar_media'),
    type: 'collapse',
    children: [
      new NavigationItem({
        routerLink: `${Constants.Routing.MediaHub.withSlash}`,
        title: 'My folder',
        icon: 'perm_media',
        type: 'item'
      }),
      new NavigationItem({
        routerLink: `${Constants.Routing.MediaHub.withSlash}`,
        queryParams: { shared: true },
        title: 'Shared folder',
        icon: 'folder_shared',
        type: 'item'
      })
    ]
  }),
  new NavigationItem({
    routerLink: `${Constants.Routing.SESSIONS.withSlash}`,
    icon: 'assistant',
    title: _extract('navbar_sessions'),
    type: 'item'
  }),
];
