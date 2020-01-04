import {
  Component, OnInit, ViewChild, ElementRef, forwardRef,
  Input, OnChanges, SimpleChanges, ChangeDetectionStrategy
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, } from '@angular/forms';
import { PhoneNumberShouldBeAssociatedWithCountry } from '@shared/validators';
import { AppUtils } from '@core/helpers/utils';
import { HttpClient } from '@angular/common/http';

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
  public id = AppUtils.generateRandomString(5);
  public intlTelInstance = null;
  private _value: any;
  // TODO: remove this after bind the field
  public control = new FormControl(null, PhoneNumberShouldBeAssociatedWithCountry(this.id));

  @Input() private code: string = null;
  @Input() private autoDetectCountry = true;

  @ViewChild('phoneField', { static: true }) private phoneField: ElementRef<HTMLElement>;

  set value(value: any) {
    this._value = value;
    this.notifyValueChange();
  }

  get value() {
    return this._value;
  }

  onChange: (value) => {};
  onTouched: () => {};

  constructor(
    private http: HttpClient
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.code && this.intlTelInstance) {
      const country = this.getCountry();
      this.intlTelInstance.setCountry(country.iso2);
    }
  }

  ngOnInit() {
    try {
      this.intlTelInstance = (window as any).intlTelInput(this.phoneField.nativeElement);
      if (this.autoDetectCountry) {
        this.getUserCountry()
          .subscribe(({ country_code }) => {
            this.code = country_code.toLowerCase();
            this.ngOnChanges(null);
          });
      } else {
        this.ngOnChanges(null);
      }
    } catch (error) {
    }
  }

  public updateModel(value: string) {
    this.value = value;
  }

  notifyValueChange(): void {
    if (this.onChange) {
      String();
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

  getUserCountry() {
    return this.http
      .configure({ DEFAULT_URL: false })
      .get<any>('https://json.geoiplookup.io');
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

}
