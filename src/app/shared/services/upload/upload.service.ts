import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpEvent, HttpProgressEvent } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { Constants } from '@core/constants';
import { MediaModel } from '@shared/models';
import { environment } from '@environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UploadService {

    constructor(
        private http: HttpClient
    ) { }

    uploadImage(file: File, folder_id: string) {
        const fd = new FormData();
        fd.append('upload', file);
        return this.http.post(Constants.API.UPLOADS.base + '/' + folder_id, fd, {
            reportProgress: true
        })
            .pipe(
                filter((event: HttpEvent<any>) => event.type === HttpEventType.UploadProgress),
                map((event: HttpProgressEvent) => Math.round(100 * event.loaded / event.total))
            );
    }

    createFolder(name: string) {
        return this.http.post<{ id: string }>(Constants.API.UPLOADS.folder, { name });
    }

    getFolderFiles(folder_id: string) {
        return this.http.get<MediaModel.IFile[]>(`${Constants.API.UPLOADS.files}/${folder_id}`)
            .pipe(map((files) => {
                return files.map(file => {
                    file.path = environment.serverOrigin + file.path;
                    file.type = file.type.split('/')[1]
                    return file;
                })
            }));
    }

    getFolders() {
        return this.http.get<MediaModel.Folder[]>(Constants.API.UPLOADS.folder);
    }

    public searchForFiles(folder_id: string, fileName: string) {
        return this.http.get<MediaModel.IFile[]>(`${Constants.API.UPLOADS.search}/${folder_id}/${fileName}`);
    }

}

