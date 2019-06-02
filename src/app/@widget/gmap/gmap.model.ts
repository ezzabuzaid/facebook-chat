import gmapMock from './lib/gmap.mock';

export const Google = (() => {
    try {
        return google.maps;
    } catch (error) {
        return gmapMock().maps;
    }
})() as typeof google.maps;

export namespace GmapModel {

    export class Position extends Google.LatLng {
        constructor(lat: number, lng: number) {
            super(lat, lng);
        }
    }
    export type LatLng = typeof Google.LatLng | typeof Google.LatLng;
    export type AddressInfoType = 'placeId' | 'location';

}

