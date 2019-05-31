import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlipCardFabDirective } from './components/flip-card-fab.directive';
import { FlipCardFabComponent } from './components/flip-card-fab/flip-card-fab.component';
import { FlipCardDirective } from './components/flip-card.directive';
import { FlipCardComponent } from './components/flip-card/flip-card.component';
import { MaterialModule } from '@shared/common';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    FlipCardComponent,
    FlipCardDirective,
    FlipCardFabComponent,
    FlipCardFabDirective
  ],
  exports: [
    FlipCardComponent,
    FlipCardDirective,
    FlipCardFabComponent,
    FlipCardFabDirective
  ]
})
export class FlipCardModule { }
