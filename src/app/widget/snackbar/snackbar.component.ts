import { Component, OnInit, Inject, OnChanges, DoCheck, ChangeDetectorRef } from '@angular/core';
import { SimpleSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarViewComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { message: string },
    public cd: ChangeDetectorRef
  ) { }

}
