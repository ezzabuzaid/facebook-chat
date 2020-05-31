import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit, SimpleChanges,
} from '@angular/core';
import { Logger } from '@core/helpers/logger';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Google } from '../../gmap.model';
import { GoogleMap } from '../../lib/gmap.main';
import { GoogleMapService } from '../../lib/gmap.service';

const log = new Logger('GmapComponent');

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GmapComponent extends GoogleMap implements OnInit, OnDestroy, OnChanges {
  private readonly unsubscribeAll = new Subject();
  // @ViewChild('search') private searchContainer: ElementRef<HTMLInputElement>;
  // @Input() search = false;
  // @Input() private dragMarkerWithMap = false;
  // @Output() searching = new EventEmitter<Google.places.PlaceResult>();

  @Input('placeId')
  set placeId(placeId) {
    GoogleMapService.geocode({ placeId })
      .pipe(map(([placeResult]) => placeResult.geometry.location.toJSON()))
      .subscribe(position => {
        if (!this.latitude || !this.longitude) {
          this.refreshPosition(position);
        }
      });
  }

  @Input() set currentPosition(value) {
    // TODO exception if both of position and currentPosition
    if (value) {
      try {
        GoogleMapService.getCurrentLocation(35, 35)
          .pipe(map(cords => cords.toJSON()))
          .subscribe(position => {
            if (!this.latitude || !this.longitude) {
              this.refreshPosition(position);
            }
          });
      } catch (error) {

      }
    }
  }

  // tslint:disable: no-input-rename
  @Input('lng') longitude: number = null;
  @Input('lat') latitude: number = null;

  constructor(
    elref: ElementRef<HTMLElement>
  ) {
    super(elref.nativeElement, {
      mapTypeControl: false,
      mapTypeControlOptions: {
        style: Google.MapTypeControlStyle.DROPDOWN_MENU,
        position: Google.ControlPosition.RIGHT_CENTER
      },
      zoomControl: true,
      zoomControlOptions: {
        position: Google.ControlPosition.RIGHT_BOTTOM
      },
      scaleControl: true,
      streetViewControl: true,
      streetViewControlOptions: {
        position: Google.ControlPosition.RIGHT_TOP
      },
      fullscreenControl: true
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    log.debug(changes);
    // test wether the changes will be applied on each change
    if (this.latitude && this.longitude) {
      this.updatePosition();
    }
  }

  updatePosition(lat: number = this.latitude, lng: number = this.longitude) {
    this.setCenter(new Google.LatLng(this.latitude, this.longitude));
  }

  refreshPosition({ lat, lng }) {
    this.latitude = lat;
    this.longitude = lng;
    this.updatePosition();
  }

  ngOnInit(): void {

  }


  // private initMapUI(element: HTMLElement, position: Google.ControlPosition) {
  //   this.mapRef.controls[Google.ControlPosition[position]].push(element);
  // }

  // private initAutoComplete() {
  //   const container = this.searchContainer.nativeElement;
  //   this.initMapUI(container, 'TOP_CENTER' as any);
  //   GoogleMapService.autoComplete(container.querySelector('input'))
  //     .pipe(takeUntil(this.unsubscribeAll))
  //     .subscribe(place => {
  //       this.changeMapAndMarkerPosition(place);
  //       this.searching.emit(place);
  //     });
  // }

  // private dragMarker() {
  //   this.moveMarkerWithMap(this.marker)
  //     .pipe(takeUntil(this.unsubscribeAll))
  //     .subscribe();
  // }

  // set searchText(v) {
  //   this.searchContainer.nativeElement.querySelector('input').textContent = v;
  // }

  ngOnDestroy(): void {
    // this.unsubscribeAll.next();
    // this.unsubscribeAll.complete();
    // this.onSearch.next();
    // this.onSearch.complete();
    // TODO
    // unsubscribe from onSearch
  }

  addControl(element, position: (keyof (typeof Google.ControlPosition))) {
    this.controls[position].push(element);
  }
}
// TODO
// Throw an exception if placeId and position applied to component together
// in OnChanges must check for the same above

