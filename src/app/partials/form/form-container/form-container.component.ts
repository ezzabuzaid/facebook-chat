import { Component, OnInit, EventEmitter, OnDestroy, Output, HostBinding, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { share, takeUntil } from 'rxjs/operators';
import { FormWidgetManager } from '../form.manager';
import { AppUtils } from '@core/helpers/utils';
import { Form } from '@shared/common';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit, OnDestroy {
  @HostBinding('class.loading') public loading = false;
  @Output() public onSubmit = new EventEmitter();
  @Input() public title: string = null;
  @Input() formGroup: Form<any>;
  fields = [];
  sections = [];
  public progressListener = this.formWidgetManager.listen().pipe(share());
  private subscription = new Subject();

  constructor(
    private formWidgetManager: FormWidgetManager
  ) { }

  ngOnInit() {
    this.progressListener
      .pipe(takeUntil(this.subscription))
      .subscribe(show => {
        this.loading = show;
      });
    const flatten = (fields: any[]) => {
      return fields.reduce((acc, field) => {
        if (this.isForm(field)) {
          acc.push(...flatten(field['fields']));
        } else {
          acc.push(field);
        }
        return acc;
      }, []);
    }
    this.fields = flatten(this.formGroup.fields)
      .sort((a, b) => a.section - b.section)
      .reduce((acc, curr) => {
        if (!acc[curr.section]) {
          this.sections.push(curr.section);
          acc[curr.section] = [];
        }
        acc[curr.section].push(curr);
        return acc;
      }, {});
  }

  submit() {
    this.onSubmit.emit({
      value: this.formGroup.value,
      valid: this.formGroup.valid
    });
  }

  ngOnDestroy() {
    AppUtils.unsubscribe(this.subscription);
  }

  isForm(field: any) {
    return field instanceof Form;
  }

}
