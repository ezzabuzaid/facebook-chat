/**
 * * Author: ezzabuzaid
 * * Email: ezzabuzaid@hotmail.com
 */

import { Component, OnInit, forwardRef, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UploadPictureService } from './upload-picture.service';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadPictureComponent),
      multi: true
    }
  ]
})
export class UploadPictureComponent implements OnInit, ControlValueAccessor {
  // * a case that you may face, two input at once, since we trigger the input change via label
  // * so we need to diffrent label key
  // ? instead of that you can generate a hash key and assign it to label
  // ? but this seems to be easy way
  private static howMuchInstance = -1;
  label = UploadPictureComponent.howMuchInstance;

  // * changeValue is a function assigned when registerOnChange called
  // * this function used to update the value both in model and view
  changeValue: (value) => void;

  // * the current value for this component, remember at end this component act as formControl
  // * so it hold a value
  value;

  // * current form control
  control: FormControl;

  constructor(
    private uploadPictureService: UploadPictureService,
    // private snackBar: MatSnackBar,
    private translateService: TranslateService,
    private injector: Injector
  ) {
    // * assign control
    // ? since no another way to know to grap the contol
    // ? i've use the injector to get the control instance
    // this.control = this.injector.get(NgControl);
    UploadPictureComponent.howMuchInstance++;
  }

  // * this function called when the value changed
  writeValue(value) {
    this.value = value;
  }
  // * called once when a reigster of component as form control done
  registerOnChange(fn) {
    this.changeValue = fn;
  }

  // * if a used touch the control, this will be called
  registerOnTouched() { }

  ngOnInit() { }

  // * utility function to get a word from translator
  private getTranslate(key) {
    return this.translateService.instant(key);
  }

  // * callback function when a success response return
  // * customize it as your need
  private successCB(value) {
    this.changeValue(value);
    const word = this.getTranslate('image_upload_success');
    this.openSnackBar(word);
  }

  // * callback function when a error response return
  // * customize it as your need
  private errorCB() {
    const word = this.getTranslate('image_upload_error');
    this.openSnackBar(word);
  }

  // * erase the control value
  removePicture() {
    this.changeValue(null);
  }

  // * openSnackbar
  openSnackBar(text: string) {
    // this.snackBar.open(text);
  }

  // * utility function check if the type of upload file belong to ...whiteList and if it less than 5mb
  allowedToUpload(file: File) {
    const whiteList = ['image/jpeg', 'image/png', 'image/svg'];
    const size = (file.size / 1000 / 1000);
    return whiteList.some(el => el === file.type) && size < 5;
  }

  // * upload picture ^^
  uploadPicture({ files: [file] }) {
    if (this.allowedToUpload(file)) {
      this.uploadPictureService.uploadImage(file)
        .subscribe(
          (value) => { this.successCB(value); },
          () => { this.errorCB(); }
        );
    } else {
      this.getTranslate('image_not_allowed').subscribe(this.openSnackBar.bind(this));
    }
  }

}
