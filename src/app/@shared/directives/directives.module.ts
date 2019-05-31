import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DropDownDirective } from './dropdown.directive';
import { TextAreaAutoResizeDirective } from './text-area-auto-resize.directive';
import { TogglePasswodDirective } from './toggle-passwod.directive';
import { TriggerFormValidationDirective } from './trigger-form-validation.directive';
import { HoverDirective } from './hover.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DropDownDirective,
    TriggerFormValidationDirective,
    TogglePasswodDirective,
    TextAreaAutoResizeDirective,
    HoverDirective
  ],
  exports: [
    DropDownDirective,
    TriggerFormValidationDirective,
    TogglePasswodDirective,
    TextAreaAutoResizeDirective,
    HoverDirective
  ]
})
export class DirectivesModule { }
