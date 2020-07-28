import { Component, OnInit, Input } from '@angular/core';
import { AppUtils } from '@core/helpers/utils/utils.service';
@Component({
  selector: 'app-favorite-checkbox',
  templateUrl: './favorite-checkbox.component.html',
  styleUrls: ['./favorite-checkbox.component.scss']
})
export class FavoriteCheckboxComponent implements OnInit {
  @Input() checked = false;
  @Input() readonly = false;
  public id = AppUtils.generateAlphabeticString();

  ngOnInit() { }

  onChange(value: boolean) {
    if (!this.readonly) {
      this.checked = value;
    }
  }

}
