import { IModel, ListEntityQuery } from './response.model';
import { environment } from '@environments/environment';
import { AppUtils } from '@core/helpers/utils';
export namespace MediaModel {
    export class Folder extends IModel {
        name: string;
        constructor(payload: Partial<Folder>) {
            super(payload);
            Object.assign(payload, Folder);
        }
    }

    export interface IFile extends IModel {
        type: string;
        size: number;
        name: string;
        path: string;
        user: string;
        folder: string;
        tag: string;
    }

    export class File extends IModel implements IFile {
        fullType: string;
        rawFile: FileList[0];
        type: string;
        size: number;
        name: string;
        path: string;
        user: string;
        folder: string;
        tag: string;

        constructor(object: Partial<File>) {
            super(object);
            this.path = object.path && object.path.split('?')[0];
            this.fullType = object.fullType ?? object.type;
            this.type = object.type.includes('/') ? object.type.split('/')[1] : object.type;
            this.size = object.size;
            this.name = object.name;
            this.user = object.user;
            this.folder = object.folder;
            this.rawFile = object.rawFile;
        }

        get fullPath() {
            return environment.serverOrigin + this.path;
        }

        isImage() {
            return AppUtils.isImage(this.path);
        }

        isPdf() {
            return AppUtils.isPdf(this.path);
        }
    }

    export class FileSearchQuery extends ListEntityQuery {
        constructor(
            public file?: string,
            public folder?: string,
            public tag?: string,
            options?: ListEntityQuery
        ) {
            super(options);
        }
    }

    export interface Tag {
        id: string;
        color: string;
    }

    export interface CreateFileResponse {
        id: string;
        path: string;
    }

}