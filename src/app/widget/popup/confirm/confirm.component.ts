import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IConfirmPopup } from '../popup.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  result = null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IConfirmPopup,
    public dialogRef: MatDialogRef<ConfirmComponent>,
  ) { }

  onNoClick(value: boolean): void {
    this.result = value;
    this.dialogRef.close(value);
  }

  ngOnInit() { }

}
