import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { FormWidgetService } from './form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormWidgetComponent implements OnInit {
  @Input() title: string;
  @Output() submit = new EventEmitter();
  @HostBinding('class.loading') loading = false;
  showSpinner = this.semiFormService.castProgressBar;
  constructor(
    private semiFormService: FormWidgetService
  ) { }

  ngOnInit() {
    this.showSpinner.subscribe(show => {
      this.loading = show;
    });
  }

}
