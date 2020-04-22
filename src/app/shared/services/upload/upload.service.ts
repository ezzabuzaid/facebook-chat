import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Constants } from '@core/constants';
import { MediaModel, PlainQuery, ListEntityResponse } from '@shared/models';


@Injectable({
    providedIn: 'root'
})
export class UploadsService {

    constructor(
        private http: HttpClient
    ) { }

    uploadImage(file: File, folder: string) {
        const fd = new FormData();
        fd.append('upload', file);
        return this.http.post<MediaModel.CreateFileResponse>(Constants.API.UPLOADS.base + '/' + folder, fd);
    }

    createFolder(name: string) {
        return this.http.post<MediaModel.CreateFileResponse>(Constants.API.UPLOADS.folders, { name });
    }

    deleteFolder(folder_id: string) {
        return this.http.delete(`${Constants.API.UPLOADS.folders}/${folder_id}`);
    }

    deleteFile(file_id: string) {
        return this.http.delete(`${Constants.API.UPLOADS.base}/${file_id}`);
    }

    updateFile(file: Partial<MediaModel.IFile>) {
        return this.http.patch(`${Constants.API.UPLOADS.base}/${file._id}`, file);
    }

    updateFolder(folder: Partial<MediaModel.Folder>) {
        return this.http.patch(`${Constants.API.UPLOADS.folders}/${folder._id}`, folder);
    }

    getFolders() {
        return this.http.get<ListEntityResponse<MediaModel.Folder>>(Constants.API.UPLOADS.folders + '/user')
            .pipe(map(({ list }) => list));
    }

    getSharedFolders() {
        return this.http.get<ListEntityResponse<MediaModel.Folder>>(Constants.API.UPLOADS.folders + '/user/shared')
            .pipe(map(({ list }) => list));
    }

    public searchForFiles(query: MediaModel.FileSearchQuery) {
        const plainQuery = new PlainQuery(query);
        return this.http.get<ListEntityResponse<MediaModel.File>>(`${Constants.API.UPLOADS.search}?${plainQuery.asString}`)
            .pipe(map((data) => {
                data.list = data.list.map(file => new MediaModel.File(file));
                return data;
            }));
    }

    getTags() {
        return this.http
            .configure({
                LOCAL_CACHE: true
            })
            .get<MediaModel.Tag[]>(`${Constants.API.UPLOADS.tags}`);
    }

}
