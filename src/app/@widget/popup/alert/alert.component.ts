import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Logger } from '@core/utils';
import { LanguageService } from '@core/helpers';
import { map, share } from 'rxjs/operators';

const log = new Logger('AlertComponent');

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  directionChange = this.languageService.onChange()
    .pipe(map(({ dir }) => dir));
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string, description: string },
    private languageService: LanguageService
  ) { }

}