import { Injectable } from '@angular/core';
import { Listener } from '@core/helpers/listener';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarManager extends Listener<boolean> {
  constructor() {
    super();
  }
}
