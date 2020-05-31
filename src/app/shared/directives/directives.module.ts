import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FullscreenDirective } from './fullscreen.directive';
import { HoverDirective } from './hover.directive';
import { TextAreaAutoResizeDirective } from './text-area-auto-resize.directive';
import { TogglePasswodDirective } from './toggle-passwod.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TogglePasswodDirective,
    TextAreaAutoResizeDirective,
    HoverDirective,
    FullscreenDirective
  ],
  exports: [
    TogglePasswodDirective,
    TextAreaAutoResizeDirective,
    HoverDirective,
    FullscreenDirective
  ]
})
export class DirectivesModule { }
