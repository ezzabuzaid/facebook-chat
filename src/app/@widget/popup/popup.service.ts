import { Injectable, Type, ComponentRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from './alert/alert.component';
import { PromptComponent } from './prompt/prompt.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PopupService<T> {
  private defaultConfig = { width: '300px' };
  constructor(
    private dialog: MatDialog
  ) { }

  alert(config: MatDialogConfig<PopupData> = {}) {
    return this.dialog.open<AlertComponent, PopupData>(AlertComponent, this.populateDialogConfig(config));
  }

  prompt(config: MatDialogConfig<PopupData> = {}) {
    const componentRef = this.dialog.open<PromptComponent, PopupData, PopupResult>(PromptComponent, this.populateDialogConfig(config));
    const mapper = map(() => componentRef.componentInstance.result);
    componentRef.beforeClosed().pipe(mapper);
    componentRef.backdropClick().pipe(mapper);
    return componentRef;
  }

  confirm(config: MatDialogConfig<PopupData> = {}) {
    return this.dialog.open<ConfirmComponent, PopupData, PopupResult>(ConfirmComponent, this.populateDialogConfig(config));
  }

  private populateDialogConfig(config) {
    return { ...this.defaultConfig, ...config, };
  }

}
interface PopupResult {
  result: string;
}

interface PopupData {
  title: string;
  description: string;
}
