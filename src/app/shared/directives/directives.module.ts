import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TextAreaAutoResizeDirective } from './text-area-auto-resize.directive';
import { TogglePasswodDirective } from './toggle-passwod.directive';
import { HoverDirective } from './hover.directive';
import { DropZoneDirective } from './drop-zone.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DropZoneDirective,
    TogglePasswodDirective,
    TextAreaAutoResizeDirective,
    HoverDirective
  ],
  exports: [
    DropZoneDirective,
    TogglePasswodDirective,
    TextAreaAutoResizeDirective,
    HoverDirective
  ]
})
export class DirectivesModule { }
