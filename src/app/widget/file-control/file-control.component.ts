import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppUtils } from '@core/helpers/utils';

@Component({
  selector: 'app-file-control',
  templateUrl: './file-control.component.html',
  styleUrls: ['./file-control.component.scss']
})
export class FileControlComponent implements OnInit {

  @ViewChild('fileInput') private readonly input: ElementRef<HTMLInputElement>;
  @Input() disabled = false;
  public id = AppUtils.generateAlphabeticString();
  @Output() public onChange = new EventEmitter<FileList>();

  constructor() { }

  @HostListener('click') openFileChooser() {
    if (!this.disabled) {
      this.input.nativeElement.click();
    }
  }

  ngOnInit(): void {
  }

  uploadFile(files: FileList) {
    this.onChange.emit(files);
  }

}
