import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Observer } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { UploadFileService } from '@shared/services/upload';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadFileComponent),
      multi: true
    }
  ]
})
export class UploadFileComponent implements OnInit, ControlValueAccessor {
  private static howMuchInstance = -1;
  public label = UploadFileComponent.howMuchInstance;

  @Input() private size = 4;
  @Input() private supported = ['jpeg', 'png'];

  changeValue: (value) => void;

  value = null;
  constructor(
    private uploadPictureService: UploadFileService,
    private snackBar: MatSnackBar,
    private translateService: TranslateService
  ) {
    UploadFileComponent.howMuchInstance++;
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

  private onSuccess(value) {
    this.changeValue(value);
    this.value = value;
    this.openSnackBar(this.getTranslate('image_upload_success'));
  }

  private onError(message) {
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
            this.onSuccess(value);
          },
          () => this.onError('image_upload_error')
        );
    } else {
      this.onError('image_not_allowed');
    }
  }

}
