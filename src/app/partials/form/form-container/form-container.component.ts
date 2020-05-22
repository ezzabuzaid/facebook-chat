import { Component, OnInit, EventEmitter, OnDestroy, Output, HostBinding, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { share, takeUntil } from 'rxjs/operators';
import { FormWidgetManager } from '../form.manager';
import { AppUtils } from '@core/helpers/utils';
import { Form } from '@shared/common';
export interface SubmitEvent<T = any> {
  value: T,
  valid: boolean;
}
@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit, OnDestroy {
  @HostBinding('class.loading') public loading = false;
  @Output() public onSubmit = new EventEmitter<SubmitEvent>();
  @Input() public title: string = null;
  @Input() formGroup: Form<any>;
  @Input() external = false;
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
    this.fields = this.groupBySection(this.sortBySection(this.flattenFields(this.formGroup?.fields || [])));
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

  private flattenFields(fields: any[]) {
    return fields.reduce((acc, field) => {
      if (this.isForm(field)) {
        acc.push(...this.flattenFields(field['fields']));
      } else {
        acc.push(field);
      }
      return acc;
    }, []);
  }

  private groupBySection(fields: any[]) {
    return fields.reduce((acc, curr) => {
      if (!acc[curr.section]) {
        this.sections.push(curr.section);
        acc[curr.section] = [];
      }
      acc[curr.section].push(curr);
      return acc;
    }, {})
  }
  private sortBySection(fields: any[]) {
    return fields.sort((a, b) => a.section - b.section);
  }

}
