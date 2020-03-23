import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpEvent, HttpProgressEvent } from '@angular/common/http';
import { map, filter, tap } from 'rxjs/operators';
import { Constants } from '@core/constants';
import { MediaModel, PlainQuery, CreateResponse } from '@shared/models';
import { environment } from '@environments/environment';

interface CreateFileResponse {
    id: string;
    path: string;
}

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
        return this.http.post<CreateFileResponse>(Constants.API.UPLOADS.base + '/' + folder_id, fd);
    }

    createFolder(name: string) {
        return this.http.post<CreateFileResponse>(Constants.API.UPLOADS.folder, { name });
    }

    deleteFolder(folder_id: string) {
        return this.http.delete(`${Constants.API.UPLOADS.folder}/${folder_id}`);
    }

    getFolders() {
        return this.http.get<MediaModel.Folder[]>(Constants.API.UPLOADS.folder);
    }

    public searchForFiles(query: MediaModel.FileSearchQuery) {
        const plainQuery = new PlainQuery(query);
        return this.http.get<MediaModel.IFile[]>(`${Constants.API.UPLOADS.search}?${plainQuery.asString}`)
            .pipe(map((files) => {
                return files.map(file => {
                    file.path = environment.serverOrigin + file.path;
                    file.type = file.type.split('/')[1]
                    return file;
                })
            }));
    }

}
