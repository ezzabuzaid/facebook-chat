import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './safe/safe.pipe';
import { NumberWithCommasPipe } from './number-with-commas.pipe';
import { CapitalizePipe } from './capitalize.pipe';
import { PluralPipe } from './plural.pipe';
import { RoundPipe } from './round.pipe';
import { TimingPipe } from './timing.pipe';

const PIPES = [
    SafePipe,
    NumberWithCommasPipe,
    CapitalizePipe,
    PluralPipe,
    RoundPipe,
    TimingPipe
];

@NgModule({
    declarations: PIPES,
    imports: [CommonModule],
    exports: PIPES,
})
export class PipesModule { }
