import { of, Observable, zip } from 'rxjs';
import { GoogleMapService } from './gmap.service';
// import { GoogleMap } from './gmap.main';
import { map, catchError } from 'rxjs/operators';
import { GmapModel } from '../gmap.model';

export class GoogleMapUtils {
    static sameCity(placeId, position) {
        return zip(
            GoogleMapService.geocode({ placeId }),
            GoogleMapService.geocode({ location: position })
        ).pipe(
            map(([selectedCityResult, currentCityResult]) => {
                console.log(selectedCityResult, currentCityResult);
                if (!(currentCityResult && selectedCityResult)) {
                    return { same: false };
                } else {
                    const selectedCityType = GoogleMapService.addressInfo(selectedCityResult, 'locality');
                    const currentCityType = GoogleMapService.addressInfo(currentCityResult, 'locality');
                    console.log(selectedCityType, currentCityType);
                    if (!(currentCityType && selectedCityType)) {
                        return { same: false };
                    } else {
                        return selectedCityType.long_name === currentCityType.long_name ? { same: true } : { same: false };
                    }
                }
            }),
            catchError(error => of({ same: false })));
    }

    static isCountry(place) {
        return place.types.some(el => el === 'country');
    }

    static isCity(place) {
        return place.types.some(el => el === 'locality');
    }

    // static initPostition(position?: GmapModel.Position | string): Observable<GmapModel.LatLng> {
    //     if (!!position) {
    //         if (typeof position !== 'string') {
    //             return of(position);
    //         } else {
    //             return GoogleMapService.reversePlaceDetails('placeId', position)
    //                 .pipe(map(([geocode]) => {
    //                     const { lat, lng } = geocode.geometry.location.toJSON();
    //                     return { latitude: lat, longitude: lng };
    //                 }));
    //         }
    //     } else {
    //         return GoogleMapService.getCurrentLocation({ latitude: 35, longitude: 33 });
    //     }
    // }

    // static initMap(element: HTMLElement, position?: GmapModel.LatLng) {
    //     return this.initPostition(position)
    //         .pipe(map(pos => {
    //             const mapRef = new GoogleMap(element, { center: position });
    //             return mapRef;
    //         }));
    // }

}
