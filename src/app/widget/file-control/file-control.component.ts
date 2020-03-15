import { Component, OnInit, EventEmitter, Output, HostListener, ViewChild, ElementRef } from '@angular/core';
import { AppUtils } from '@core/helpers/utils';

@Component({
  selector: 'app-file-control',
  templateUrl: './file-control.component.html',
  styleUrls: ['./file-control.component.scss']
})
export class FileControlComponent implements OnInit {
  public id = AppUtils.generateAlphabeticString();
  @Output() public onChange = new EventEmitter<FileList>();

  @ViewChild('fileInput') private input: ElementRef<HTMLInputElement>;

  @HostListener('click') openFileChooser() {
    this.input.nativeElement.click();
  }

  constructor() { }

  ngOnInit(): void {
  }

  uploadFile(files: FileList) {
    this.onChange.emit(files);
  }

}
