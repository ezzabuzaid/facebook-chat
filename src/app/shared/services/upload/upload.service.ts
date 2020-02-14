import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpEvent, HttpProgressEvent } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UploadFileService {
    constructor(private http: HttpClient) { }

    uploadImage(file: File) {
        const fd = new FormData();
        fd.append('image', file);
        return this.http.post(`images`, fd, { reportProgress: true })
            .pipe(
                filter((event: HttpEvent<any>) => event.type === HttpEventType.UploadProgress),
                map((event: HttpProgressEvent) => Math.round(100 * event.loaded / event.total))
            );
    }
}

