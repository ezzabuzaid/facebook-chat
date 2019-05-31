import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material';
import { SnackbarViewComponent } from './snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService<T= any> {
  currentlyOpenReference: MatSnackBarRef<SnackbarViewComponent> = null;
  constructor(
    private matSnackbar: MatSnackBar
  ) { }

  open(message: string, config: MatSnackBarConfig = {}) {
    this.currentlyOpenReference = this.matSnackbar.openFromComponent(SnackbarViewComponent, {
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      duration: 3000,
      data: { message },
      ...config
    });
    return this.currentlyOpenReference;
  }

  modifyInstance(data: T) {
    Object.assign(this.currentlyOpenReference.instance, data);
    this.currentlyOpenReference.instance.cd.markForCheck();
  }

}

// interface SnackbarConfig extends MatSnackBarConfig {
//   action?: string;
// }
