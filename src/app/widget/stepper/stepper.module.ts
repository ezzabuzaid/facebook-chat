import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@shared/common';
import { StepComponent } from './step/step.component';
import { StepperViewComponent } from './stepper-view/stepper-view.component';

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
