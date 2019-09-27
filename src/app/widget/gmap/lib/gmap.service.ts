import { Observable, Observer, fromEventPattern } from 'rxjs';
import { GmapModel } from '../gmap.model';
import { map } from 'rxjs/operators';

export class GoogleMapService {
    /**
     * @param fallback used if current location is not supported or user has denied to use current location
     * when it called it's check if the navigator is supported and if it check for the user response
     * if both rejected this method will retrun an error otherwise
     * it will check that the browser is good enough to use the power of getlocation
     * therefore it will return the current location or an error tells you that there's something with the browser
     */
    public static getCurrentLocation(lat: number, lng: number): Observable<GmapModel.Position> {
        return new Observable((observer: Observer<GmapModel.Position>) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
                    const currentPosition = new GmapModel.Position(latitude, longitude);
                    observer.next(currentPosition);
                    observer.complete();
                }, () => {
                    // observer.error('an error accourd to browser while trying to get the current locatino');
                    observer.next(new GmapModel.Position(lat, lng));
                    observer.complete();
                });
            } else {
                // Browser doesn't support Geolocation or user decide to not get the current location
                // or user has decied to not use geolocation
                // observer.error('User decide to not use geolocation or browser doesn\'t support it');
                observer.next(new GmapModel.Position(lat, lng));
                observer.complete();
            }
        });
    }
    /**
     * @param way is string to used as search by e.g: location, placeId
     * @param value the value to search
     * if position supplied, accept valid lat, lng to reverse the position and get place info
     * if geocoder status is not { OK } this mean the position hasn't a geometry therefore current location will used
     */
    static geocode(options: google.maps.GeocoderRequest): Observable<google.maps.GeocoderResult[]> {
        const observable = new Observable((observer: Observer<google.maps.GeocoderResult[]>) => {
            new google.maps.Geocoder().geocode(options, (results, status) => {
                if (status === 2) {
                    if (results[0]) {
                        observer.next(results);
                        observer.complete();
                    } else {
                        observer.error(null);
                    }
                } else {
                    observer.error(null);
                }
            });
        });
        return observable;
    }

    /**
     * the address_components the produced from nethier geocoder result or place resulte e.g autcomplete
     * @param typeValue see google maps types
     */
    static addressInfo(
        address_components: google.maps.GeocoderResult[] | google.maps.GeocoderAddressComponent,
        typeValue: string
    ): google.maps.GeocoderAddressComponent {
        const searchIn = list => {
            for (const i of list) {
                if (i.types.some(el => el === typeValue)) {
                    return i;
                }
            }
        };
        if (Array.isArray(address_components)) {
            for (const component of address_components) {
                const found = searchIn(component.address_components);
                if (found) {
                    return found;
                }
            }
        } else if (!!address_components) {
            return searchIn(address_components);
        }
        return null;
    }

    public static autoComplete(
        input: HTMLInputElement,
        options: google.maps.places.AutocompleteOptions & { event?: string } = {}
    ) {
        // !Disable autocomplete submit event
        google.maps.event.addDomListener(input, 'keydown', (event) => {
            if (event['keyCode'] === 13) {
                event.preventDefault();
            }
        });
        const autocomplete = new google.maps.places.Autocomplete(input, { type: 'geocode', ...options });
        // const listener = handler => autocomplete.addListener(options.event || 'place_changed', handler.bind(handler));
        // not tested if really will remove the lisitener
        // return fromEventPattern<google.maps.places.Autocomplete>(
        //     handler => listener(handler),
        //     handler => google.maps.event.removeListener(handler as any)
        // ).pipe(map(() => autocomplete));
        return autocomplete;
    }
}
