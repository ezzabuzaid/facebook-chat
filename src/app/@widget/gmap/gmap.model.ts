import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import gmapMock from './lib/gmap.mock';

export const Google = (() => {
    if (isPlatformBrowser(PLATFORM_ID)) {
        return google.maps;
    } else {
        return gmapMock().maps;
    }
})() as typeof google.maps;

export namespace GmapModel {

    export type LatLng = typeof Google.LatLng | typeof Google.LatLng;
    export class Position extends (Google.LatLng || null) {
        constructor(lat: number, lng: number) {
            super(lat, lng);
        }
    }
    export type AddressInfoType = 'placeId' | 'location';

}

