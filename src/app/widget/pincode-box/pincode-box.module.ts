import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PincodeBoxComponent, PincodeBoxDialog } from './pincode-box.component';
import { MaterialModule } from '@shared/common';
import { MatDialog } from '@angular/material/dialog';

export const openPincodeDialog = (dialog: MatDialog) => {
  return () => dialog.open(PincodeBoxComponent, {
    panelClass: ['pincode-dialog-panel']
  });
};

@NgModule({
  declarations: [PincodeBoxComponent],
  exports: [PincodeBoxComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [
    {
      provide: PincodeBoxDialog,
      useFactory: openPincodeDialog,
      deps: [MatDialog]
    }
  ]
})
export class PincodeBoxModule { }

