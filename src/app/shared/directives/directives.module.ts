import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TextAreaAutoResizeDirective } from './text-area-auto-resize.directive';
import { TogglePasswodDirective } from './toggle-passwod.directive';
import { HoverDirective } from './hover.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TogglePasswodDirective,
    TextAreaAutoResizeDirective,
    HoverDirective
  ],
  exports: [
    TogglePasswodDirective,
    TextAreaAutoResizeDirective,
    HoverDirective
  ]
})
export class DirectivesModule { }
