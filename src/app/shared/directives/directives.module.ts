import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FullscreenDirective } from './fullscreen.directive';
import { HoverDirective } from './hover.directive';
import { TextAreaAutoResizeDirective } from './textarea-autoresize.directive';
import { TogglePasswodDirective } from './toggle-passwod.directive';
import { PreventDefaultsDirective } from './prevent-defaults.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TogglePasswodDirective,
    TextAreaAutoResizeDirective,
    HoverDirective,
    FullscreenDirective,
    PreventDefaultsDirective
  ],
  exports: [
    TogglePasswodDirective,
    TextAreaAutoResizeDirective,
    HoverDirective,
    FullscreenDirective,
    PreventDefaultsDirective
  ]
})
export class DirectivesModule { }
