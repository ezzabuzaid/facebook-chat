import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepComponent } from './step/step.component';
import { StepperViewComponent } from './stepper-view/stepper-view.component';
import { MaterialModule } from '@shared/common';

@NgModule({
  declarations: [
    StepComponent,
    StepperViewComponent
  ],
  exports: [
    StepComponent,
    StepperViewComponent,
    // CdkStepperModule,
  ],
  imports: [
    CommonModule,
    // CdkStepperModule,
    MaterialModule,
  ]
})
export class StepperModule { }
