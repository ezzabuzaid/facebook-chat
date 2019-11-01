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
    routerLink: `${Constants.Routing.Users.withSlash}/${GenericCrudModel.EOperations.READ}`,
    icon: 'person',
    title: _extract('navbar.users'),
    type: 'item'
  },
  {
    routerLink: `${Constants.Routing.Todos.withSlash}/${GenericCrudModel.EOperations.READ}`,
    icon: 'todo',
    title: _extract('navbar.todos'),
    type: 'item'
  },
  {
    routerLink: '/meals',
    icon: 'fastfood',
    title: _extract('navbar.meals'),
    type: 'item'
  },
  {
    routerLink: '/menus',
    icon: 'restaurant_menu',
    title: _extract('navbar.menus'),
    type: 'item'
  },
  {
    icon: '',
    title: 'IndexDB operations',
    type: 'item',
    routerLink: 'indexDB'
  }
  // dataSource = [
  //   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  //   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  //   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  //   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  //   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  //   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  //   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  //   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  //   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  //   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  // ];
];
// export default [
//   {
//     routerLink: '/dashboard',
//     icon: 'dashboard',
//     title: _extract('navbar.dashboard'),
//     type: 'item'
//   }, {
//     routerLink: '/countries',
//     icon: 'location_city',
//     title: _extract('navbar.area.configuration'),
//     type: 'item',
//   }, {
//     routerLink: '/customers',
//     icon: 'supervised_user_circle',
//     title: _extract('navbar.customers'),
//     type: 'item'
//   }, {
//     icon: 'view_carousel',
//     title: _extract('navbar.drivers.configuration'),
//     type: 'collapse',
//     children: [
//       {
//         icon: 'directions_car',
//         title: _extract('navbar.drivers.list'),
//         routerLink: '/drivers/'
//       },
//       {
//         icon: 'person_pin',
//         title: _extract('navbar.drivers.top_view'),
//         routerLink: '/drivers/view'
//       }
//     ]
//   }, {
//     routerLink: '/hubs',
//     icon: 'device_hub',
//     title: _extract('navbar.hubs'),
//     type: 'item',
//   }, {
//     routerLink: '/shipment',
//     icon: 'directions_car',
//     title: _extract('navbar.shipment'),
//     type: 'item'
//   }, {
//     icon: 'settings',
//     title: _extract('navbar.shipment_config_option'),
//     type: 'collapse',
//     children: [
//       { icon: '', title: _extract('navbar.shelfs'), routerLink: '' },
//       // { icon: 'access_time', title: 'time_slot', routerLink: '/shipment-configuration/timeslot' },
//       { icon: '', title: _extract('navbar.reasons'), routerLink: '' },
//     ]
//   }, {
//     routerLink: '/sheet',
//     icon: 'directions_car',
//     title: _extract('navbar.run_sheet'),
//     type: 'item'
//   }
// ] as LayoutNavigation[];
