import { IModel, Query } from './response.model';
import { environment } from '@environments/environment';
import { Omit, AppUtils } from '@core/helpers/utils';
export namespace MediaModel {
    export class Folder extends IModel {
        name: string;
        constructor(payload: Partial<Folder>) {
            super(payload);
            Object.assign(payload, Folder);
        }
    }

    export class File extends IModel {
        fullType: string;
        rawFile: FileList[0];
        type: string;
        size: number;
        name: string;
        path: string;
        user: string;
        folder: string;
        constructor(object: Partial<File>) {
            super();
            this.path = object.path && object.path.split('?')[0];
            this.fullType = object.fullType ?? object.type;
            this.type = object.type.includes('/') ? object.type.split('/')[1] : object.type;
            this.size = object.size;
            this.name = object.name;
            this.user = object.user;
            this.folder = object.folder;
            this._id = object._id;
            this.createdAt = object.createdAt || this.createdAt;
            this.updatedAt = object.updatedAt || this.updatedAt;
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

    export class FileSearchQuery extends Query {
        constructor(
            public file?: string,
            public folder?: string,
            public tag?: string,
        ) {
            super();
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