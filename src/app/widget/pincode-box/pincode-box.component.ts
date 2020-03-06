import { Component, OnInit, ViewChildren, QueryList, ViewChild, ElementRef, InjectionToken, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { MatButton } from '@angular/material/button';

export const PincodeBoxDialog = new InjectionToken('PincodeBoxDialog');

@Component({
  selector: 'app-pincode-box',
  templateUrl: './pincode-box.component.html',
  styleUrls: ['./pincode-box.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PincodeBoxComponent implements OnInit {
  @ViewChildren('codeInput') private inputsList: QueryList<ElementRef<HTMLInputElement>>;
  @ViewChild('confirmButton') private confirmButton: MatButton;
  inputCount = new Array(6);

  constructor() { }

  ngOnInit() { }

  onKeyup(index: number) {
    const nextInputIndex = index + 1;
    if (nextInputIndex === this.inputCount.length) {
      this.confirmButton.focus();
    } else {
      const input = this.getInput(nextInputIndex);
      input.focus();
      input.select();
    }
  }

  onBackspace(index: number) {
    const previousInputIndex = index - 1;
    if (previousInputIndex >= 0) {
      this.getInput(previousInputIndex).focus();
    }
  }

  getInput(index: number) {
    return this.inputsList.toArray()[index].nativeElement;
  }

}
