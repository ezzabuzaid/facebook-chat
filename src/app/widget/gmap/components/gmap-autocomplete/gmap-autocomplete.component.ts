import { Component, OnInit, ElementRef, ViewChild, Input, OnDestroy, Inject, AfterViewInit } from '@angular/core';
import { Subject, fromEventPattern, concat } from 'rxjs';
import { GoogleMapService } from 'app/widget/gmap/lib/gmap.service';
import { GmapComponent } from '../gmap-view/gmap.component';
import { takeUntil, skip } from 'rxjs/operators';

@Component({
  selector: 'app-gmap-autocomplete',
  templateUrl: './gmap-autocomplete.component.html',
  styleUrls: ['./gmap-autocomplete.component.scss'],
})
export class GmapAutocompleteComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribeAll = new Subject();
  private mapReady = new Subject();
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
    @Inject(GmapComponent) private gmap: GmapComponent
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
