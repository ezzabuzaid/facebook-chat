import { Component, OnInit, Input, Output, EventEmitter, HostBinding, OnDestroy } from '@angular/core';
import { FormWidgetService } from './form.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormWidgetComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Output() submit = new EventEmitter();
  @HostBinding('class.loading') loading = false;
  public showSpinner = this.semiFormService.castProgressBar;

  private _subscription = new Subject();
  constructor(
    private semiFormService: FormWidgetService
  ) { }

  ngOnInit() {
    this.showSpinner.subscribe(show => {
      this.loading = show;
    });
  }

  ngOnDestroy() {
    this._subscription.next();
    this._subscription.complete();
  }

}
