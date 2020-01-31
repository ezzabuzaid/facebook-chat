import { Component, OnInit, forwardRef, Input, HostListener, HostBinding } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Observer } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { UploadFileService } from '@shared/services/upload';
import { AppUtils } from '@core/helpers/utils';

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
  constructor(
    private uploadFileService: UploadFileService,
    private snackBar: MatSnackBar,
    private translateService: TranslateService
  ) { }
  public id = AppUtils.generateAlphabeticString();

  @Input() private size = 4;
  @Input() private supported = ['jpeg', 'png'];
  @HostBinding('class.drag-over') dragOverClass = false;
  changeValue: (value: string) => void;

  value = null;

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    AppUtils.preventBubblingAndCapturing(event);
    this.dragOverClass = true;
  }


  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent) {
    AppUtils.preventBubblingAndCapturing(event);
    this.dragOverClass = false;
  }

  @HostListener('drop', ['$event']) ondrop(event) {
    AppUtils.preventBubblingAndCapturing(event);
    this.dragOverClass = false;
    const files = [...event.dataTransfer.files];

    if (AppUtils.isTruthy(files.length)) {
      [...files].forEach((file: File) => {
        this.uploadFile(file);
      });
    }
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

  removeFile() {
    this.changeValue(null);
  }

  openSnackBar(text: string) {
    this.snackBar.open(text);
  }

  allowedToUpload(file: File) {
    const size = (file.size / 1000 / 1000);
    return this.supported.some(el => `image/${el}` === file.type) && size < this.size;
  }

  uploadFile(file: File) {
    if (this.allowedToUpload(file)) {
      AppUtils.readFile(file)
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

  openBrowserSelectWindow(fileInput: HTMLInputElement) {
    fileInput.click();
  }

}
