import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

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
  @Input() public placeholder: string = null;
  public control = new FormControl(null);
  // TODO: the countries should be fetched from [intl] lib or provided by user
  public countries;
  private _value: any;
  public currentCountry;

  set value(value: any) {
    this._value = value;
    this.notifyValueChange();
  }

  get value(): any {
    return this._value;
  }

  onChange: (value) => {};
  onTouched: () => {};

  notifyValueChange() {
    if (this.onChange) {
      this.onChange(this.value);
    }
  }

  ngOnInit() { }

  public updateModel(value: string) {
    this.value = value;
    this.currentCountry = this.getCountry();
  }

  public getCountry() {
    return this.countries.find(el => el.code === this.control.value);
  }

  writeValue(obj: string) {
    if (obj) {
      obj = obj.toUpperCase();
      this._value = obj;
      this.control.setValue(obj);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
