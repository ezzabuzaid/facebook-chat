import { Component, OnInit, Input, forwardRef, Inject, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { WINDOW } from '@shared/common';
import { IField } from '@partials/form';

@Component({
  selector: 'app-country-control',
  templateUrl: './country-control.component.html',
  styleUrls: ['./country-control.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CountryControlComponent),
    multi: true
  }],
})
export class CountryControlComponent implements OnInit, ControlValueAccessor {
  @Input() public formControl: IField<any> = null;
  public countries = [];

  private _value: string;
  public currentCountry = null;

  constructor(
    @Inject(WINDOW) private window: Window
  ) { }

  set value(value) {
    this._value = value;
    this.currentCountry = this.getCountry();
    this.notifyValueChange();
  }

  get value() {
    return this._value;
  }

  onChange: (value) => {};
  onTouched: () => {};

  notifyValueChange() {
    if (this.onChange) {
      this.onChange(this.value);
    }
  }

  ngOnInit() {
    this.countries = this.window['intlTelInputGlobals'].getCountryData()
  }

  public updateModel(value: string) {
    this.value = value;
  }

  public getCountry() {
    return this.countries.find(el => el.iso2 === this.formControl.value);
  }

  writeValue(value: string) {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
