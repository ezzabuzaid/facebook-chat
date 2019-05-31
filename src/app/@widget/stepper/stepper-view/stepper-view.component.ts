import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';
import { Directionality } from '@angular/cdk/bidi';
import { Logger } from '@core/utils';
const log = new Logger('StepperViewComponent');
@Component({
  selector: 'app-stepper',
  templateUrl: './stepper-view.component.html',
  styleUrls: ['./stepper-view.component.scss'],
  providers: [{ provide: CdkStepper, useExisting: StepperViewComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class StepperViewComponent extends CdkStepper implements OnInit {

  constructor(
    private dir: Directionality,
    private cd: ChangeDetectorRef
  ) {
    super(dir, cd);
  }

  ngOnInit() { }

  onClick(index: number) {
    this.selectedIndex = index;
    // this.cd.detectChanges();
  }

  selectedStep(index) {
    log.debug('selectedIndex');
    return this.selectedIndex === index;
  }

}
