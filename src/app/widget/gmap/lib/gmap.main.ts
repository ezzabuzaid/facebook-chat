/// <reference types="@types/googlemaps" />
import { fromEventPattern } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { GmapModel, Google } from '../gmap.model';
import { GoogleMapService } from './gmap.service';
// import { GoogleMapMarker } from './marker';

export class GoogleMap extends Google.Map {

    markers: google.maps.Marker[] = [];
    /**
     *
     * @param element reference to the element that will hold the map view
     * @param options options to be applied on the map
     */
    constructor(element: HTMLElement, options: google.maps.MapOptions = {}) {
        super(element, {
            zoom: 15,
            ...options
        });
    }

    toPlace({ geometry: { viewport, location } }: google.maps.places.PlaceResult) {
        if (viewport) {
            this.fitBounds(viewport);
        } else {
            this.panTo(location);
        }
        return this;
    }

    infoWindowPopup(options: google.maps.InfoWindowOptions) {
        const infoWindow = new google.maps.InfoWindow(options);
        return infoWindow;
    }


    moveMarkerWithMap(marker: google.maps.Marker) {
        // this method must be moved to seperate class
        // seperate the method to follow single responsiblity function
        return fromEventPattern(
            (handler) => this.addListener('drag', handler.bind(handler))
        ).pipe(
            tap(() => {
                marker.setPosition(this.getCenter());
            })
        );
        // return fromEventPattern((handler) => this.addListener('dragend', handler.bind(handler)))
        // .pipe(switchMap(() => GoogleMapService.reversePlaceDetails({ location: marker.getPosition() })));
    }

    // remove all marker from the map
    removeMarkers() {
        this.markers.forEach(marker => {
            marker.setMap(null);
        });
        this.markers = [];
    }

    // TODO use the observer pattren to subscribe the marker instead of add it to ordinary array
    createMarker(options: google.maps.MarkerOptions) {
        const marker = new Google.Marker({
            map: this,
            animation: google.maps.Animation.DROP,
            ...options
        });
        this.markers.push(marker);
        this.panTo(marker.getPosition());
        return marker;
    }


    // retrive the marker from markers list
    // this must be retrived from markerSubject
    marker(index): google.maps.Marker {
        return this.markers[index];
    }

}
