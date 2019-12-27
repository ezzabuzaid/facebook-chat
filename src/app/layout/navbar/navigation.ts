import { _extract } from '@shared/common';
import { Constants } from '@core/constants';
import { GenericCrudModel } from 'app/pages/generic-crud/generic-crud.model';
export interface LayoutNavigation {
  type: LayoutNavigationType;
  title: string;
  icon: string;
  routerLink?: string;
  children?: LayoutNavigation[];
}

export type LayoutNavigationType = 'item' | 'collapse';
export default [
  {
    routerLink: `${Constants.Routing.Users.withSlash}/${GenericCrudModel.Operations.READ}`,
    icon: 'person',
    title: _extract('navbar_users'),
    type: 'item'
  },
  {
    routerLink: `${Constants.Routing.Todos.withSlash}/${GenericCrudModel.Operations.READ}`,
    icon: 'fastfood',
    title: _extract('navbar_todos'),
    type: 'item'
  },
  // {
  //   routerLink: '/meals',
  //   icon: 'fastfood',
  //   title: _extract('navbar.meals'),
  //   type: 'item'
  // },
  // {
  //   routerLink: '/menus',
  //   icon: 'restaurant_menu',
  //   title: _extract('navbar.menus'),
  //   type: 'item'
  // },
];
