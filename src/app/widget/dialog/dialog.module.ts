import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent, GLOBAL_CONFIG_FOR_DIALOG } from 'app/widget/dialog/dialog.component';
import { DialogService } from 'app/widget/dialog/dialog.service';
import { Backdrop } from './backdrop.utils';

@NgModule({
  imports: [
    CommonModule
  ],
  entryComponents: [DialogComponent],
  declarations: [
    DialogComponent
  ],
  providers: [
    DialogService,
    Backdrop,
  ]
})
export class DialogModule {
  static forRoot(config?: GlobarDialogConfig): ModuleWithProviders {
    return {
      ngModule: DialogModule,
      providers: [
        { provide: GLOBAL_CONFIG_FOR_DIALOG, useValue: Object.assign({ width: '500px', fadeLeave: 150, fadeEnter: 150 }, config) }
      ]
    };
  }
}

interface GlobarDialogConfig {
  width: string;
}
