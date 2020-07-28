import { Component, EventEmitter, forwardRef, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppUtils } from '@core/helpers/utils';
import { TranslateService } from '@ngx-translate/core';
import { UploadsService } from '@shared/services/upload';

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

  @HostBinding('class.box') get isBox() { return this.type === 'box'; }
  @HostBinding('class.verpose') get isVerpose() { return this.type === 'verbose'; }

  @Input() private readonly external = false;

  @Input() private readonly size = 4;
  @Input() private readonly supported = ['jpeg', 'png', 'gif'];

  public id = AppUtils.generateAlphabeticString();
  public value: string = null;
  @Output() onUpload = new EventEmitter();
  @Input() type: EUploadFileType = 'verbose';

  @HostBinding('class.drag-over') public dragOverClass = false;

  changeValue: (value: string) => void = null;
  constructor(
    private readonly uploadFileService: UploadsService,
    private readonly snackBar: MatSnackBar,
    private readonly translateService: TranslateService
  ) { }


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
    return this.supported.some(el => `image/${ el }` === file.type) && size < this.size;
  }

  uploadFile(file: File) {
    if (this.allowedToUpload(file)) {
      if (this.external) {
        this.onUpload.emit(file);
      } else {
        this.uploadFileService.uploadImage(file, 'others')
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
