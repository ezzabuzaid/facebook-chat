import { _extract } from '@shared/common';
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
    routerLink: '/dashboard',
    icon: 'dashboard',
    title: _extract('navbar.dashboard'),
    type: 'item'
  }, {
    routerLink: '/countries',
    icon: 'location_city',
    title: _extract('navbar.area.configuration'),
    type: 'item',
  }, {
    routerLink: '/customers',
    icon: 'supervised_user_circle',
    title: _extract('navbar.customers'),
    type: 'item'
  }, {
    icon: 'view_carousel',
    title: _extract('navbar.drivers.configuration'),
    type: 'collapse',
    children: [
      {
        icon: 'directions_car',
        title: _extract('navbar.drivers.list'),
        routerLink: '/drivers/'
      },
      {
        icon: 'person_pin',
        title: _extract('navbar.drivers.top_view'),
        routerLink: '/drivers/view'
      }
    ]
  }, {
    routerLink: '/hubs',
    icon: 'device_hub',
    title: _extract('navbar.hubs'),
    type: 'item',
  }, {
    routerLink: '/shipment',
    icon: 'directions_car',
    title: _extract('navbar.shipment'),
    type: 'item'
  }, {
    icon: 'settings',
    title: _extract('navbar.shipment_config_option'),
    type: 'collapse',
    children: [
      { icon: '', title: _extract('navbar.shelfs'), routerLink: '' },
      // { icon: 'access_time', title: 'time_slot', routerLink: '/shipment-configuration/timeslot' },
      { icon: '', title: _extract('navbar.reasons'), routerLink: '' },
    ]
  }, {
    routerLink: '/sheet',
    icon: 'directions_car',
    title: _extract('navbar.run_sheet'),
    type: 'item'
  }
] as LayoutNavigation[];
