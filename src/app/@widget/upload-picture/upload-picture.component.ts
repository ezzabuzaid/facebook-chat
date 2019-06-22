import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UploadPictureService } from './upload-picture.service';
import { Observable, Observer } from 'rxjs';
import { MatSnackBar } from '@angular/material';


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
  private static howMuchInstance = -1;
  public label = UploadPictureComponent.howMuchInstance;

  @Input() private size = 4;
  @Input() private supported = ['jpeg', 'png'];

  changeValue: (value) => void;

  value = null;
  constructor(
    private uploadPictureService: UploadPictureService,
    private snackBar: MatSnackBar,
    private translateService: TranslateService
  ) {
    UploadPictureComponent.howMuchInstance++;
  }

  writeValue(value) {
    this.value = value;
  }

  registerOnChange(fn) {
    this.changeValue = fn;
  }

  registerOnTouched() { }

  ngOnInit() { }

  private getTranslate(key) {
    return this.translateService.instant(key);
  }

  private successCB(value) {
    this.changeValue(value);
    this.value = value;
    this.openSnackBar(this.getTranslate('image_upload_success'));
  }

  private errorCB(message) {
    this.openSnackBar(this.getTranslate(message));
  }

  removePicture() {
    this.changeValue(null);
  }

  openSnackBar(text: string) {
    this.snackBar.open(text);
  }

  allowedToUpload(file: File) {
    const size = (file.size / 1000 / 1000);
    return this.supported.some(el => `image/${el}` === file.type) && size < this.size;
  }

  readFile(file: File) {
    return new Observable((observer: Observer<string | ArrayBuffer>) => {
      const reader = new FileReader();
      reader.addEventListener('abort', (error) => observer.error(error));
      reader.addEventListener('error', (error) => observer.error(error));
      reader.addEventListener('progress', console.log);
      // reader.addEventListener('load', (e) => observer.next(reader.result as string));
      reader.addEventListener('loadend', (e) => observer.next(reader.result));
      reader.readAsDataURL(file);
    });
  }

  uploadPicture({ files: [file] }) {
    if (this.allowedToUpload(file)) {
      this.readFile(file)
        .subscribe(
          (value) => {
            console.log(value);
            this.successCB(value);
          },
          () => this.errorCB('image_upload_error')
        );
    } else {
      this.errorCB('image_not_allowed');
    }
  }

}
