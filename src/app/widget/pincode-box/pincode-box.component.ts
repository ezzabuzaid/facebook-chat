import {
  Component, ElementRef, EventEmitter, inject, Inject,
  InjectionToken, Input, OnInit, Optional, Output, QueryList, ViewChild, ViewChildren
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export type PincodeBoxDialogHandler = (data: PincodeBoxData) => MatDialogRef<PincodeBoxComponent>;

export interface PincodeBoxData {
  type: 'account' | 'mobile' | 'email',
  proxy: 'sms' | 'email'
}

export const PincodeBoxDialog = new InjectionToken('PincodeBoxDialog', {
  providedIn: 'root',
  factory: () => {
    const dialog = inject(MatDialog);
    return (data: PincodeBoxData) => dialog.open(PincodeBoxComponent, {
      data,
      width: '600px'
    })
  }
});

@Component({
  selector: 'app-pincode-box',
  templateUrl: './pincode-box.component.html',
  styleUrls: ['./pincode-box.component.scss']
})
export class PincodeBoxComponent implements OnInit {
  @ViewChildren('codeInput') private readonly inputsList: QueryList<ElementRef<HTMLInputElement>>;
  @ViewChild('confirmButton') private readonly confirmButton: MatButton;
  inputCount = new Array(6);
  @Input('data') _inputData: PincodeBoxData;
  @Output() onSubmit = new EventEmitter();

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) private readonly _dialogData: PincodeBoxData
  ) { }

  ngOnInit() { }

  moveToNextField(index: number) {
    const nextInputIndex = index + 1;
    if (nextInputIndex === this.inputCount.length) {
      setTimeout(() => {
        this.confirmButton.focus();
      });
    } else {
      const input = this.getInput(nextInputIndex);
      input.focus();
      input.select();
    }
  }

  moveToPrevField(index: number) {
    const previousInputIndex = index - 1;
    if (previousInputIndex >= 0) {
      this.getInput(previousInputIndex).focus();
    }
  }

  getInput(index: number) {
    return this.inputsList.toArray()[index].nativeElement;
  }

  get data() {
    return this._inputData ?? this._dialogData;
  }

  submit() {
    this.onSubmit.next(this.inputsList.map(input => input.nativeElement.value).join(''));
  }

}
