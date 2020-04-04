import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertComponent } from './alert/alert.component';
import { PromptComponent } from './prompt/prompt.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { Injectable } from '@angular/core';

@Injectable()
export class PopupManager {
  private defaultConfig: MatDialogConfig<any> = { width: '450px' };
  constructor(
    private dialog: MatDialog
  ) { }

  alert(config: MatDialogConfig<PopupData> = {}) {
    return this.dialog.open<AlertComponent, PopupData>(AlertComponent, this.populateDialogConfig(config));
  }

  prompt(config: MatDialogConfig<IPromptPopup> = {}) {
    const componentRef = this.dialog.open<PromptComponent, PopupData, string>(PromptComponent, this.populateDialogConfig(config));
    componentRef.componentInstance.data = config.data || {};
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
  title?: string;
  description?: string;
}


export interface IConfirmPopup extends PopupData {
  close?: string;
  confirm?: string;
}

export interface IPromptPopup extends PopupData {
  value?: string
  confirm?: string;
}
