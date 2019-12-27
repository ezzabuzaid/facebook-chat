import { Component, OnInit, ViewChild, ElementRef, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, } from '@angular/forms';
import { PhoneNumberShouldBeAssociatedWithCountry } from '@shared/validation';
import { FloatLabelType } from '@angular/material';
import { AppUtils } from '@core/helpers/utils';

@Component({
  selector: 'app-mobile-control',
  templateUrl: './mobile-control.component.html',
  styleUrls: ['./mobile-control.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MobileControlComponent),
    multi: true
  }]
})
export class MobileControlComponent implements OnInit, OnChanges, ControlValueAccessor {
  public id = AppUtils.generateRandomString(5);
  public intlTelInstance = null;
  private _value: any;
  public control = new FormControl(null, PhoneNumberShouldBeAssociatedWithCountry(this.id));

  @Input() private dialCode: number = null;
  @ViewChild('phoneField', { static: true }) private phoneField: ElementRef<HTMLElement>;

  get floatType(): FloatLabelType {
    return this.value ? 'always' : 'never';
  }

  set value(value: any) {
    this._value = value;
    this.notifyValueChange();
  }

  get value() {

    return this._value;
  }
  onChange: (value) => {};
  onTouched: () => {};

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.dialCode && this.intlTelInstance) {
      const country = (window as any).intlTelInputGlobals.getCountryData().find(el => el.dialCode === String(this.dialCode));
      this.intlTelInstance.setCountry(country.iso2);
    }
  }

  ngOnInit() {
    try {
      this.intlTelInstance = (window as any).intlTelInput(this.phoneField.nativeElement);
      this.ngOnChanges(null);
    } catch (error) {
    }
  }

  public updateModel(value: string) {
    this.value = value;
  }

  notifyValueChange(): void {
    if (this.onChange) {
      this.onChange(this.value);
    }
  }

  writeValue(obj: any) {
    if (obj) {
      this._value = obj;
      this.control.setValue(obj);
      this.intlTelInstance.setNumber(obj);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
