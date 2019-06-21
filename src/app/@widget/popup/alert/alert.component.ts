import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { LanguageService } from '@core/helpers';
import { map } from 'rxjs/operators';

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
