import { Component, OnInit, EventEmitter, OnDestroy, Output, HostBinding, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { share, takeUntil } from 'rxjs/operators';
import { FormWidgetManager } from '../form.manager';
import { AppUtils } from '@core/helpers/utils';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit, OnDestroy {
  @HostBinding('class.loading') public loading = false;
  @Output() public onSubmit = new EventEmitter();
  @Input() public title: string = null;

  public progressListener = this.formWidgetManager.listen().pipe(share());
  private _subscription = new Subject();

  constructor(
    private formWidgetManager: FormWidgetManager
  ) { }

  ngOnInit() {
    this.progressListener
      .pipe(takeUntil(this._subscription))
      .subscribe(show => {
        this.loading = show;
      });
  }

  submit() {
    this.onSubmit.emit(null);
  }

  ngOnDestroy() {
    AppUtils.unsubscribe(this._subscription);
  }


}
