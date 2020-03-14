import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpEvent, HttpProgressEvent } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { Constants } from '@core/constants';
import { MediaModel } from '@shared/models';

@Injectable({
    providedIn: 'root'
})
export class UploadService {

    constructor(
        private http: HttpClient
    ) { }

    uploadImage(file: File) {
        const fd = new FormData();
        fd.append('image', file);
        return this.http.post(Constants.API.UPLOADS.base, fd, { reportProgress: true })
            .pipe(
                filter((event: HttpEvent<any>) => event.type === HttpEventType.UploadProgress),
                map((event: HttpProgressEvent) => Math.round(100 * event.loaded / event.total))
            );
    }

    createFolder(name: string) {
        return this.http.post(Constants.API.UPLOADS.folder, { name });
    }

    getFolderFiles(id: string) {
        return this.http.get<MediaModel.IFile[]>(`${Constants.API.UPLOADS.files}/${id}`);
    }

    getFolders() {
        return this.http.get<MediaModel.IFolder[]>(Constants.API.UPLOADS.folder);
    }

    public searchForFiles(folder_id: string, fileName: string) {
        return this.http.get<MediaModel.IFile[]>(`${Constants.API.UPLOADS.base}/${folder_id}/${fileName}`);
    }

}

