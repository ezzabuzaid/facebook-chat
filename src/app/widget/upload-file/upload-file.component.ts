import { Component, OnInit, forwardRef, Input, HostListener, HostBinding, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadService } from '@shared/services/upload';
import { AppUtils } from '@core/helpers/utils';
import { switchMap } from 'rxjs/operators';

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
    private uploadFileService: UploadService,
    private snackBar: MatSnackBar,
    private translateService: TranslateService
  ) { }

  public id = AppUtils.generateAlphabeticString();
  public value: string = null;

  @Input() private external = false;
  @Output() onUpload = new EventEmitter();

  @Input() private size = 4;
  @Input() private supported = ['jpeg', 'png', 'gif'];
  @Input() type: EUploadFileType = 'verbose';

  @HostBinding('class.box') get isBox() { return this.type === 'box'; }
  @HostBinding('class.verpose') get isVerpose() { return this.type === 'verbose'; }

  @HostBinding('class.drag-over') public dragOverClass = false;

  changeValue: (value: string) => void = null;


  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    AppUtils.preventBubblingAndCapturing(event);
    this.dragOverClass = true;
  }


  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent) {
    AppUtils.preventBubblingAndCapturing(event);
    this.dragOverClass = false;
  }

  @HostListener('drop', ['$event']) ondrop(event: DragEvent) {
    AppUtils.preventBubblingAndCapturing(event);
    this.dragOverClass = false;
    const files = event.dataTransfer.files;

    if (AppUtils.isTruthy(files.length)) {
      for (let index = 0; index < files.length; index++) {
        const file: File = files[index];
        this.uploadFile(file);
      }
    }
  }

  writeValue(value: string) {
    this.value = value;
  }

  registerOnChange(fn: () => void) {
    this.changeValue = fn;
  }

  registerOnTouched() { }

  ngOnInit() { }

  private getTranslate(key: string) {
    return this.translateService.instant(key);
  }

  private onSuccess(value: string) {
    this.value = value;
    this.changeValue(value);
    this.openSnackBar(this.getTranslate('image_upload_success'));
  }

  private onError(message: string) {
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
      if (this.external) {
        this.onUpload.emit(file);
      } else {
        return this.uploadFileService.uploadImage(file, 'others')
          .subscribe(
            ({ id, path }) => {
              this.onSuccess(path);
            },
            () => this.onError('image_upload_error')
          );
      }
    } else {
      this.onError('image_not_allowed');
    }
  }

  openBrowserSelectWindow(fileInput: HTMLInputElement) {
    fileInput.click();
  }

}




export type EUploadFileType = 'box' | 'verbose';