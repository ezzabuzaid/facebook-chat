import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { map } from 'rxjs/operators';
import { LanguageService } from '@core/helpers';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  result = false;
  directionChange = this.languageService.onChange()
    .pipe(map(({ dir }) => dir));
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string, description: string },
    private languageService: LanguageService
  ) { }

  ngOnInit() {
  }

}
