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

}
