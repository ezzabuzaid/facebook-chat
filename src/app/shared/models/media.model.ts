import { AppUtils } from '@core/helpers/utils';
import { environment } from '@environments/environment';
import { of } from 'rxjs';
import { BaseModel, ListEntityQuery } from './response.model';
export namespace MediaModel {
    export class Folder extends BaseModel {
        name: string;
        constructor(payload: Partial<Folder>) {
            super(payload);
            Object.assign(payload, Folder);
        }
    }

    export interface IFile extends BaseModel {
        type: string;
        size: number;
        name: string;
        path: string;
        user: string;
        folder: string;
        tag: string;
    }

    export class File extends BaseModel implements IFile {

        get fullPath() {
            return `${ environment.serverOrigin }${ this.path ? this.path.split('?')[0] : '' }`;
        }

        get shortType() {
            return this.type.split('/')[1];
        }

        get src() {
            return this.path && !this.rawFile ? of(this.fullPath) : AppUtils.readFile(this.rawFile);
        }
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
            this.path = object.path;
            this.type = object.type;
            this.size = object.size;
            this.name = object.name;
            this.user = object.user;
            this.folder = object.folder;
            this.rawFile = object.rawFile;
        }

        isImage() {
            return AppUtils.isImage(this.fullPath);
        }

        isPdf() {
            return AppUtils.isPdf(this.fullPath);
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
