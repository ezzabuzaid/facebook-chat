import {
  Component, OnInit, ViewChild, ElementRef, forwardRef,
  Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, Inject, PLATFORM_ID
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { PhoneNumberAssociatedWithCountryValidator } from '@shared/validators';
import { AppUtils } from '@core/helpers/utils';
import { IField } from '@shared/common';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-mobile-control',
  templateUrl: './mobile-control.component.html',
  styleUrls: ['./mobile-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MobileControlComponent),
    multi: true
  }]
})
export class MobileControlComponent implements OnInit, OnChanges, ControlValueAccessor {
  private intlTelInstance = null;

  @Input() private code: string = null;
  @Input() private autoDetectCountry = true;
  @Input() public formControl: IField<any, string> = null;

  @ViewChild('phoneField', { static: true }) private phoneField: ElementRef<HTMLElement>;

  get selectedCountryCode() {
    const country = this.intlTelInstance.getSelectedCountryData();
    return country && country.dialCode;
  }

  onChange: (value: string) => {};
  onTouched: () => {};

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.code && this.intlTelInstance) {
      const country = this.getCountry();
      this.intlTelInstance.setCountry(country.iso2);
    }
  }

  ngOnInit() {
    if (this.autoDetectCountry && this.code) {
      throw new TypeError('you can not use [autoDetectCountry] along with [code]');
    }
    this.formControl.addValidator(PhoneNumberAssociatedWithCountryValidator(this.formControl.id));
    try {
      this.intlTelInstance = (window as any).intlTelInput(this.phoneField.nativeElement);
      if (this.autoDetectCountry) {
        this.getUserCountry()
          .subscribe(({ countryCode }) => {
            this.code = countryCode.toLowerCase();
            this.ngOnChanges(null);
          });
      } else {
        this.ngOnChanges(null);
      }
    } catch (error) { }
  }

  writeValue(value: any) {
    try {
      this.intlTelInstance.setNumber(value);
    } catch (error) {
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  getUserCountry(): Observable<IpApi> {
    return from(fetch('http://ip-api.com/json')
      .then(res => res.json()));
  }

  getCountry(code = this.code) {
    return (window as any).intlTelInputGlobals.getCountryData()
      .find(country => {
        const dialCode = country.dialCode.toLowerCase();
        const isoCode = country.iso2.toLowerCase();
        const inputCode = String(code).toLowerCase();
        return AppUtils.equals(dialCode, inputCode) || AppUtils.equals(isoCode, inputCode);
      });
  }

  updateModel() {
    this.onChange(this.intlTelInstance?.getNumber());
  }

}

interface IpApi {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
}