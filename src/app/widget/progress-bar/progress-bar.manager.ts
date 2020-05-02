import { Injectable } from '@angular/core';
import { SubjectFactory } from '@core/helpers/listener';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarManager extends SubjectFactory<boolean> {
  constructor() {
    super();
  }
}
