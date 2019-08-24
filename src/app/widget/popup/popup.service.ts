import { Injectable, Type, ComponentRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from './alert/alert.component';
import { PromptComponent } from './prompt/prompt.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private defaultConfig: MatDialogConfig<any> = { width: '300px' };
  constructor(
    private dialog: MatDialog
  ) { }

  alert(config: MatDialogConfig<PopupData> = {}) {
    return this.dialog.open<AlertComponent, PopupData>(AlertComponent, this.populateDialogConfig(config));
  }

  prompt(config: MatDialogConfig<PopupData> = {}) {
    const componentRef = this.dialog.open<PromptComponent, PopupData, boolean>(PromptComponent, this.populateDialogConfig(config));
    return componentRef;
  }

  confirm(config: MatDialogConfig<IConfirmPopup> = {}) {
    return this.dialog.open<ConfirmComponent, IConfirmPopup, boolean>(ConfirmComponent, this.populateDialogConfig(config));
  }

  private populateDialogConfig(config) {
    return { ...this.defaultConfig, ...config, };
  }

}

export interface PopupData {
  title: string;
  description: string;
}


export interface IConfirmPopup extends PopupData {
  close?: string;
  confirm?: string;
}

export interface IPromptPopup extends PopupData {
  close?: string;
  confirm?: string;
}
