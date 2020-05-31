import { AfterViewInit, Component, ElementRef, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GoogleMapService } from 'app/widget/gmap/lib/gmap.service';
import { concat, fromEventPattern, Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { GmapComponent } from '../gmap-view/gmap.component';

@Component({
  selector: 'app-gmap-autocomplete',
  templateUrl: './gmap-autocomplete.component.html',
  styleUrls: ['./gmap-autocomplete.component.scss'],
})
export class GmapAutocompleteComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly unsubscribeAll = new Subject();
  private readonly mapReady = new Subject();
  _input: HTMLInputElement = null;
  _position;
  autocomplete: google.maps.places.Autocomplete = null;

  @ViewChild('inputContainer', { static: false }) container: ElementRef<HTMLElement> = null;

  @Input()
  set position(value) {
    this._position = google.maps.ControlPosition[value];
  }
  get position() {
    return this._position || google.maps.ControlPosition.TOP_CENTER;
  }

  get input() {
    return this._input;
  }
  set input(value) {
    this._input = value;
  }

  constructor(
    @Inject(GmapComponent) private readonly gmap: GmapComponent
  ) { }

  ngOnInit() {
    concat(this.isMapReady(), this.onChange())
      .pipe(
        skip(1),
        takeUntil(this.unsubscribeAll)
      )
      .subscribe((data) => {
        const place = this.autocomplete.getPlace();
        if (place.geometry) {
          this.gmap.toPlace(place);
        } else {
          alert(`This place doesn't have a geometry`);
        }
      });
  }

  ngAfterViewInit() {
    const el = this.container.nativeElement;
    this.input = el.querySelector('input');
    this.gmap.addControl(el, this.position);

    const autocomplete = this.autocomplete = GoogleMapService.autoComplete(this.input);
    autocomplete.bindTo('bounds', this.gmap);
    this.mapReady.next();
    this.mapReady.complete();
  }

  onChange() {
    const listener = handler => this.autocomplete.addListener('place_changed', handler.bind(handler));
    return fromEventPattern(handler => listener(handler)).pipe(takeUntil(this.unsubscribeAll));
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  isMapReady() {
    return this.mapReady.asObservable();
  }

}
