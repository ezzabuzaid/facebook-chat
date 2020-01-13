
import { Directive, Output, Input, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { AppUtils } from '@core/helpers/utils';

@Directive({
    selector: '[appDropZone]'
})
export class DropZoneDirective {

    @Output() onFileDropped = new EventEmitter<any>();

    @HostListener('dragover', ['$event']) onDragOver(event) {
        AppUtils.preventBubblingAndCapturing(event);
    }


    @HostListener('dragleave', ['$event']) onDragLeave(event) {
        AppUtils.preventBubblingAndCapturing(event);
    }


    @HostListener('drop', ['$event']) ondrop(event) {
        AppUtils.preventBubblingAndCapturing(event);
        let files = event.dataTransfer.files;
        if (files.length > 0) {
            this.onFileDropped.emit(files)
        }
    }


}