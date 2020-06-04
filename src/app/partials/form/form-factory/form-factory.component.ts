import {
  ApplicationRef,
  ChangeDetectionStrategy, Component, ComponentFactoryResolver, ElementRef, EmbeddedViewRef,
  forwardRef, Injector, Input, OnInit, Type
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateField, EFieldType, Field, IRawFieldComponent, RawField, SelectField } from '../field-factory';


@Component({
  selector: 'app-field-factory',
  templateUrl: './form-factory.component.html',
  styleUrls: ['./form-factory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FieldFactoryComponent),
    multi: true
  }]
})

export class FieldFactoryComponent implements OnInit {
  @Input() field: Field<any> | RawField | DateField<any, any> | SelectField<any, any>;
  types = EFieldType;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private applicationRef: ApplicationRef,
    private elementRef: ElementRef<HTMLElement>
  ) { }

  ngOnInit() {
    if (this.rawField()) {
      this.createComponent(this.rawField().component);
    }
  }

  private createComponent(component: Type<IRawFieldComponent<any>>) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = factory.create(this.injector);
    componentRef.instance.formControl = this.field;
    this.applicationRef.attachView(componentRef.hostView);
    const element = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    this.elementRef.nativeElement.appendChild(element);
  }


  normalField() {
    return this.field instanceof Field ? this.field : null;
  }

  rawField() {
    return this.field instanceof RawField ? this.field : null;
  }

  selectField() {
    return this.field instanceof SelectField ? this.field : null;
  }

  dateField() {
    return this.field instanceof DateField ? this.field : null;
  }

}
